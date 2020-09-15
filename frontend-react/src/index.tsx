import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import client from './app/config/apollo.client';
import reducer, { initialState } from './app/state/reducerStateValue';
import { StateProvider } from './app/state/useStateValue';

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* wrap with state provider */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <App />
      </div>
    </StateProvider>
  </ApolloProvider>
  , document.getElementById('root')
);
