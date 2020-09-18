import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { drawerCategories, envVariables as e, RouteKey, routes } from './app/config';
import { theme } from './app/theme';
import { ResponsiveDrawer } from './components/material-ui/navigation';

interface Props {
  logged?: boolean;
}

export const Routes: React.FC<Props> = ({ logged }: Props) => {
  let routerChild;
  // drawerApp
  if (logged) {
    routerChild = <ResponsiveDrawer title={e.appTitle} categories={drawerCategories} />;
  } 
  // signIn and signUp routes
  else {
    routerChild = (
      <Fragment>
        <Redirect to={routes[RouteKey.HOME].path} />
        <Route exact path={routes[RouteKey.HOME].path} component={routes[RouteKey.SIGN_IN].component} />
        <Route exact path={routes[RouteKey.SIGN_UP].path} component={routes[RouteKey.SIGN_UP].component} />
      </Fragment>
    );
  }

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        {routerChild}
      </MuiThemeProvider>
    </Router>
  );
}
