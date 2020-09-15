import React, { createContext, useContext, useReducer } from 'react';

// 1. wrap app with StateProvider
// <StateProvider initialState={initialState} reducer={reducer}>
//   App content ...
// </StateProvider>
//
// 2. then use and update the state inside your app, get custom hook useStateValue
// const [state, dispatch] = useStateValue();
// const [{ theme }, dispatch] = useStateValue();

type StateProviderArgumentType = {
  reducer: any,
  initialState: any,
  children: any
};

// First we createContext and assign it to StateContext object 
// containing Provider and Consumer. We will need just a Provider here.
export const StateContext = createContext(null);

// Then we create new React component called StateProvider. 
// This component wraps it’s children with Provider that accepts value prop.
export const StateProvider = ({ reducer, initialState, children }: StateProviderArgumentType) => (
  // pass result of the useReducer hook as a value to our Provider
  // useReducer accept reducer and initialState which are passed as a props 
  // from outside. So you have full control over them inside your app
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// So this useStateValue function on the last line of our code is basically 
// a custom hook and it’s a little trick how to access your state in any 
// component of your application with less amount of code. 
// It returns exactly the same [state, dispatch] array, that is passed as a 
// value to our Provider.
export const useStateValue = () => useContext(StateContext);