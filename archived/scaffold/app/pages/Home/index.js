import React from 'react';
import './style.scss';
import Actions from '../../actions';

class Home extends React.Component {

  componentDidMount() {
    Actions.example();
  }

  render() {
    return (
      <h2>Home</h2>
    );
  }
}

export default Home;
