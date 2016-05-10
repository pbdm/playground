import { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexLink, hashHistory, IndexRoute, withRouter } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class Home extends Component {
  handle() {
    require.ensure([], function (require) {
        require('./child')
    })
  }
  render() {
    return <div>
              <h3>Home</h3>
              <div onClick={this.handle}>click</div>
           </div>          
  }
}

class About extends Component {
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
        return 'You have unsaved information, are you sure you want to leave this page?'
    })
  }
  render() {
    return <h3>About</h3>
  }
}

class NoMatch extends Component {
  render() {
    return <h3>NoMatch</h3>
  }
}

class Inbox extends Component {

  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
}

class Message extends Component {
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
}

class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="about" component={withRouter(About)} />
          <Route path="inbox" component={Inbox}>
            <Route path="messages/:id" component={Message} />
          </Route>
        </Route>
        <Route path="*" component={NoMatch} />
      </Router>
    );
  }
}


render( <Root />, document.getElementById('app'))
