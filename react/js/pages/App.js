import React from 'react'
import { IndexLink, Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>TODO</h1>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/infinite">Infinite</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App
