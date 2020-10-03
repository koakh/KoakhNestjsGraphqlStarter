import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import client from './app/config/apollo.client';
import reducer, { initialState } from './app/state/reducerStateValue';
import { StateProvider } from './app/state/useStateValue';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'reflect-metadata';

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* wrap with state provider */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <CssBaseline />
      <div className="App">
        <App />
      </div>
    </StateProvider>
  </ApolloProvider>
  , document.getElementById('root')
);
