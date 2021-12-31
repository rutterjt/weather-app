import React, { useReducer } from 'react';

import { reducer, defaultState } from './reducer';

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
