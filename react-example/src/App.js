import React, { Component } from 'react';
import Parent from './lifecycle/Parent';
// import Parent from './ErrorBoundary/Parent';

class App extends Component {
  
  render() {
    return (
      <div>
        <Parent />
      </div>
    );
  }
}

export default App;
