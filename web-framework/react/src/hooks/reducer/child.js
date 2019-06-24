import React, { useContext } from 'react';
import { Context } from './common';

export default (props) => {

  const { state, dispatch } = useContext(Context)

  function onClick() {
    dispatch({ 
      type: 'UPDATE', 
      count: state.count + 1
    });
  }
 
  return (
    <>
      <button onClick={onClick}>click me!!</button>
    </>
  );
};
