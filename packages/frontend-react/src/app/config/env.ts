export type EnvConfig = {
  appTitle: string;
  appCopyrightName: string;
  appCopyrightUri: string;
  graphqlServerHttpProtocol: string;
  graphqlServerWsProtocol: string;
  graphqlServerHttpUri: string;
  graphqlServerWsUri: string;
  restServerHttpUri: string;
  apolloFetchPolicy: any;
  apolloRejectUnauthorized: boolean;
  reactAppApolloShowGraphqlErrors: boolean;
  reactAppApolloShowNetworkError: boolean;
}

export const envVariables: EnvConfig = {
  // app
  appTitle: process.env.REACT_APP_TITLE || 'SolidaryChain GraphQL React Starter',
  appCopyrightName: process.env.REACT_APP_COPYRIGHT_NAME || 'SolidaryChain',
  appCopyrightUri: process.env.REACT_APP_COPYRIGHT_URI || 'https://solidarychain.com',
  // graphql
  graphqlServerHttpProtocol: process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL,
  graphqlServerWsProtocol: process.env.REACT_APP_GRAPHQL_SERVER_WS_PROTOCOL,
  graphqlServerHttpUri: `${process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}/graphql`,
  graphqlServerWsUri: `${process.env.REACT_APP_GRAPHQL_SERVER_WS_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}/graphql`,
  // used to work with refresh-token
  restServerHttpUri: `${process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}`,
  // apollo
  apolloFetchPolicy: process.env.REACT_APP_APOLLO_FETCH_POLICY || 'cache-first',
  apolloRejectUnauthorized: (process.env.REACT_APP_APOLLO_REJECT_UNAUTHORIZED === 'true') ? true : false || false,
  reactAppApolloShowGraphqlErrors: (process.env.REACT_APP_APOLLO_SHOW_GRAPHQL_ERRORS === 'true') ? true : false || false,
  reactAppApolloShowNetworkError: (process.env.REACT_APP_APOLLO_SHOW_NETWORK_ERROR === 'true') ? true : false || false,
};
