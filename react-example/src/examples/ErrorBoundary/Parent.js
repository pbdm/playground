import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Child from './Child';

export default class Parent extends React.Component {

  render() {
    return (
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    )
  }
}
