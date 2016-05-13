import { Component } from 'react'

class Message extends Component {
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
}

export default Message 
