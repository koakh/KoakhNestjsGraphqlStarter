import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { drawerCategories, drawerTitle } from './app/config';
import { theme } from './app/theme';
import { ResponsiveDrawer } from './components/material-ui/navigation';
import { SignInPage, SignUpPage } from './pages';

interface Props {
  logged?: boolean;
}

export const Routes: React.FC<Props> = ({ logged }: Props) => {
  let routerChild;
  // drawerApp
  if (logged) {
    routerChild = <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />;
  } 
  // signIn and signUp routes
  else {
    routerChild = (
      <Fragment>
        <Redirect to="/" />
        <Route exact path='/' component={SignInPage} />
        <Route exact path='/signup' component={SignUpPage} />
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
