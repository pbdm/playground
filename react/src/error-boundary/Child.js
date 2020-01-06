import React from 'react';

export default class Child extends React.Component {

  render() {
    throw new Error('I crashed!');
  }
}
