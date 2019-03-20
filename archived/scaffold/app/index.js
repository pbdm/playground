import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './pages/App';

class Root extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./pages/Home').default);
            });
          }} />
          {/* <Route path="about" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/About').default);
            });
          }}/>
          <Route path="*" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/NoMatch').default);
            });
          }}/>*/}
        </Route>
      </Router>
    );
  }
}

render( <Root />, document.getElementById('app'))
