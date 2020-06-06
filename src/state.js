import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const initializeFormData = (appMode) => {
  return appMode.groups.reduce((memo, group) => {
    group.questions.forEach((question) => {
      if (question.defaultValue !== undefined) {
        memo[question.name] = question.defaultValue;
      } else if (question.checked !== undefined) {
        memo[question.name] = question.value || question.checked;
      }
    });

    return memo;
  }, {});
};

const reducer = (state, payload) => {
  const newState = {
    ...state,
    form: payload.form || state.form,
    appMode: payload.appMode || state.appMode,
  };
  console.log('Payload', payload);
  console.log('New state', newState);
  return newState;
};

export const StateProvider = ({ initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
