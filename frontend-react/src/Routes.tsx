import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { drawerCategories, RoutePaths } from './app/config';
import { theme } from './app/theme';
import { ResponsiveDrawer } from './components/material-ui/navigation';
import { SignInPage, SignUpPage } from './pages';
import { envVariables as e } from './app/config';

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
        <Redirect to={RoutePaths.HOME} />
        <Route exact path={RoutePaths.HOME} component={SignInPage} />
        <Route exact path={RoutePaths.SIGNUP} component={SignUpPage} />
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
