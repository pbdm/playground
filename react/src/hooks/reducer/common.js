
import React from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { 
        ...state, 
        count: action.count
      };
    default:
      throw new Error();
  }
};

export const Context = React.createContext(null)
