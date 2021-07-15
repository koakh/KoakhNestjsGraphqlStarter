import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAccessToken, setAccessToken } from '../access-token';
import { envVariables as e } from './env';
import jwtDecode from 'jwt-decode';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import https from 'https';
import { onError } from '@apollo/link-error';

// Apollo client 3: client config
// https://www.apollographql.com/docs/react/data/subscriptions/

// apolloLinkTokenRefresh
const refreshLink = new TokenRefreshLink({
  // define accessToken field
  accessTokenField: 'accessToken',
  // check if current accessToken is valid
  isTokenValidOrUndefined: () => {
    const accessToken = getAccessToken();
    // invalid Token
    if (!accessToken) {
      return true;
    }
    // check if valid Token is not Expired
    try {
      const { exp } = jwtDecode(accessToken);
      // if current time is greater than exp
      return (Date.now() >= exp * 1000) ? false : true;
    } catch (error) {
      return false;
    }
  },
  // if not valid, request a new accessToken with refreshToken
  fetchAccessToken: () => {
    return fetch(`${e.restServerHttpUri}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
  },
  // handle fetch accessToken
  handleFetch: accessToken => {
    // set inMemory accessToken
    setAccessToken(accessToken);
  },
  // handle Response
  // handleResponse: (operation, accessTokenField) => response => {
  //   // here you can parse response, handle errors, prepare returned token to
  //   // further operations
  //   // returned object should be like this:
  //   // {
  //   //    access_token: 'token string here'
  //   // }
  // },
  handleError: err => {
    // full control over handling token fetch Error
    // TODO refresh jwt token here
    debugger;
    console.warn('Your refresh token is invalid. Try to re-login');
    console.error(err);
    // your custom action here
    // user.logout();
  }
});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    // add breakpoint here to debug graphql operations
    Promise.resolve(operation)
      .then(operation => {
        // get inMemory accessToken from global variable
        const accessToken = getAccessToken();
        console.log(`requestLink with accessToken ${accessToken}`);
        // if have accessToken, add authorization headers
        if (accessToken) {
          operation.setContext({
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const httpLink = new HttpLink({
  uri: e.graphqlServerHttpUri,
  fetchOptions: {
    // How to avoid "self signed certificate" error?
    agent: new https.Agent({ rejectUnauthorized: e.apolloRejectUnauthorized }),
  },
  // required, else we can't receive jid cookie
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: e.graphqlServerWsUri,
  options: {
    reconnect: true,
    // here we can send arbitrary data to be passed to server
    // ex server catch with `const authToken: string = ('authorization' in connectionParamsLowerKeys)`
    connectionParams: () => ({
      authorization: `Bearer ${getAccessToken()}`,
    }),
    lazy: true,
  },
});

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // detected wsLink
  wsLink,
  // detected httpLink
  httpLink,
);

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  // require to use Additive composition to compose splitLink, requestLink
  link: ApolloLink.from([
    // apolloLinkTokenRefresh
    refreshLink,
    // normal apolloLink stuff
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors && e.reactAppApolloShowGraphqlErrors) {
        console.error(graphQLErrors);
      }
      if (networkError && e.reactAppApolloShowNetworkError) {
        console.error(networkError);
      }
    }),
    // requestLink
    requestLink,
    // splitLink
    splitLink,
  ]),
});

export default client;