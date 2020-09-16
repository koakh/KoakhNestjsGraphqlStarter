import * as React from 'react';
import { useState } from 'react';
import { setAccessToken } from './app';
import './App.css';
import { envVariables as e } from './app/config/env';
import { ActionType, useStateValue } from './app/state';
import { LinearIndeterminate } from './components/material-ui/feedback';
import { usePersonProfileLazyQuery } from './generated/graphql';
import { Routes } from './Routes';

interface Props { }

export const App: React.FC<Props> = () => {
  // context state hook
  const [state, dispatch] = useStateValue();
  // state hook
  const [loading, setLoading] = useState(true)
  // person hook
  const [profileQuery, { called: profileCalled, data: profileData, loading: profileLoading }] = usePersonProfileLazyQuery();
  const [profileLoaded, setProfileLoaded] = useState(false);

  // on app mounts, request a new accessToken with cookie jid refreshToken, and set it in inMemory accessToken
  React.useEffect(() => {
    // require credentials to send jid cookie from browser
    fetch(`${e.restServerHttpUri}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    })
      // hooks don't support async/await, to bypass we can use .then
      .then(async res => {
        // but here we can use it to await for json() Promise
        const data = await res.json();
        // disable loading, and let it pass to render Routes
        setLoading(false);
        // set inMemory AccessToken
        setAccessToken(data.accessToken);
        // fire profile hook
        if (!profileCalled) profileQuery();
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      // cleanup stuff
    };
  }, [state.user.logged, profileCalled, profileQuery]);

  // used to update state with profile data, diferent of profile page that fires mutations to bring all data
  // require own useEffect to prevent error `Warning: Cannot update a component (`StateProvider`) while rendering a different component (`App`). To locate the bad setState() call inside `App``
  React.useEffect(() => {
    if (!profileLoaded && profileData) {
      // dispatch state
      const payload = {
        profile: {
          id: profileData.personProfile.id,
          firstName: profileData.personProfile.firstName,
          lastName: profileData.personProfile.lastName,
          username: profileData.personProfile.username,
          email: profileData.personProfile.email,
          roles: profileData.personProfile.roles
        }
      };
      dispatch({ type: ActionType.SIGNED_IN_USER, payload });
      // set state to profile loaded to prevent loops
      setProfileLoaded(true);
    }
  }, [profileLoaded, profileData, dispatch]);

  // require to use both loading states
  if (loading && profileLoading) {
    return <LinearIndeterminate />
  }

  return (<Routes logged={state.user.logged} />);
}