import React from 'react';
import { createPortal } from 'react-dom';

export default class Example extends React.Component {

  render() {
    return <div>
      我是内容
      <Dialog />
    </div>;
  }
}

class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div>我是弹框</div>,
      this.node
    )
  }
}
