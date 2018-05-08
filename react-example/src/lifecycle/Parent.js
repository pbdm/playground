import React, { Component } from 'react';
import Child from './Child';

class App extends Component {

  state = {
    child: 1
  }

  handleClick = () => {
    this.setState({
      child: this.state.child + 1
    })
  }

  render() {
    return (
      <div>
        <Child data={this.state.child} />
        <div onClick={this.handleClick}>chick me to update</div>
      </div>
    );
  }
}

export default App;
