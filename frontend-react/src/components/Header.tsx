import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue, ActionType } from '../app/state';
import { setAccessToken, headerLinksNavStyle } from '../app';
import { usePersonLogoutMutation } from '../generated/graphql';
import { Loading } from '../components';

interface Props { }

export const Header: React.FC<Props> = () => {
  // get hook
  const [state, dispatch] = useStateValue();
  const [logoutDisabled, setLogoutDisabled] = useState(false);

  // debug helper
  // const stateOutput = <pre>{JSON.stringify(state, undefined, 2)}</pre>;

  // DEPRECATED: now use state
  // this will use apollo cache, and this cache is modified in login, check `store.writeQuery` on Login.tsx
  // const { data, loading } = usePersonProfileQuery();

  // access apollo client to clear cache store on logout
  const [logout, { client }] = usePersonLogoutMutation();

  let body: any = null;

  // DEPRECATED: now use state
  // if (loading) {
  //   body = null;
  // } else if (data && data.personProfile) {
  //   body = <div>You are logged in as: {data.personProfile.username}</div>;
  // } else {
  //   body = <div>You are not logged in</div>
  // }

  return (
    <header>
      <div style={headerLinksNavStyle}>
        <Link to='/'>home</Link> : <Link to='/profile'>profile</Link> : <Link to='/transactions'>transactions</Link> : <Link to='/state'>state</Link>
      </div>
      {body}
      <div>
        {/* {!loading && data && data.personProfile ? (} */}
        {state.user.logged ? (
          <button disabled={logoutDisabled} onClick={async () => {
            // disable button
            setLogoutDisabled(true);
            // fire logoutMutation
            await logout();
            // clear/reset apollo cache store
            // to prevent problems resetStore, like in the past don't use asyn/await, and use .then
            // with setAccessToken and dispatch inisde
            client.resetStore()
              .then((value) => {
                // clean inMemory accessToken
                setAccessToken('');
                // dispatch logout
                dispatch({ type: ActionType.LOGOUT_USER });
              })
              .catch(error => {
                console.error(error);
              });
          }
          }>logout</button>
        ) : null}
        {/* show loading when we logout */}
        {logoutDisabled && <Loading />}
      </div>
    </header>
  );
}
