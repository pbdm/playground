import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, withRouter } from 'react-router'

import Perf from 'react-addons-perf'

//Perf.start();

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    childRoutes: [
      {
        path: '',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/Home'));
          });
        }
      },
      {
        path: '/about',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/NoMatch'));
          });
        }
      }
    ]
  }]
};

class Root extends Component {
  render() {
    /*    return (
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
      ); */
    return (
      <Router history={ hashHistory } routes={ rootRoute } />
    );
  }
}

render( <Root />, document.getElementById('app'))
