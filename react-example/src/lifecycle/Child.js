import React, { Component } from 'react';

// https://reactjs.org/docs/react-component.html

class Child extends Component {

  state = {
    local: 10,
    mounted: false
  }

  // mounting
  constructor(props) {
    super(props); // so that this.props won't be undefined
    console.log('constructor','this.props', this.props, 'this.state', this.state)
    // this.state = {
    //   local: 10,
    //   mounted: false
    // }
  }

  

  // updating
  // UNSAFE_componentWillReceiveProps()
  // componentWillReceiveProps() {
  //   console.log('unsafe componentWillReceiveProps');
  // }

  // mounting, updating
  // 如果只是 state 更改不会触发这个函数
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', "nextProps", nextProps, "prevState", prevState)
    // return null;
    return {
      local: prevState.local + 10
    }
  }

  // mounting
  // UNSAFE_componentWillMount()
  // componentWillMount() {
  //   console.log('unsafe componentWillMount')
  // }

  // updating
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', 'nextProps', nextProps, 'nextState', nextState, 'this.props', this.props, 'this.state', this.state) 
    return true;
    // Note that in the future React may treat shouldComponentUpdate() as a hint rather than a strict directive, and returning false may still result in a re-rendering of the component.
    // return false;
  }

  // updating
  // UNSAFE_componentWillUpdate()
  // componentWillUpdate() {
  //   console.log('unsafe componentWillUpdate')
  // }

  // unmounting
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  // Error Handling
  componentDidCatch(error, info) {
    console.log('error: ' + error)
    console.log('error info: ' + info)
  }

  // mounting, updating
  render() {
    // should be pure!!!
    console.log('render', 'this.props', this.props, 'this.state', this.state)
    return (
      <div>
        child
        <img src="https://cdn.rawgit.com/pbdm/img/master/20180508110912_xNMRvq_Screenshot.jpeg" style={{width: '100%'}} alt="lifecycle"/>
      </div>
    );
  }

  // updating
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate','prevProps', prevProps, 'prevState', prevState, 'this.props', this.props, 'this.state', this.state)
    return 'mySnapshot';
  }

  // mounting
  componentDidMount() {
    console.log('componentDidMount', 'this.props', this.props, 'this.state', this.state)
    this.setState({
      mounted: true
    })
  }

  // updating
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', 'prevProps', prevProps, 'prevState', prevState, 'this.props', this.props, 'this.state', this.state, 'snapshot', snapshot) 
  }

}

export default Child
