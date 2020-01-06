// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
import React, { useReducer } from 'react';
import Child from './child';
import { reducer, Context } from './common';

const App = () => {

  const [state, dispatch] = useReducer(reducer, {
    count: 0
  });
  const { count } = state; 

  return (
    <Context.Provider value={{ state, dispatch }}>
      { count }
      <Child />
    </Context.Provider>
  )
};

export default App;
