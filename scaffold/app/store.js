import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
// import promiseMiddleware from './middlewares/promise';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger({
  level: 'info',
  // collapsed: false
  collapsed: true
});


const store = createStore(reducers, {}, applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes: [ 'PENDING', 'SUCCESS', 'ERROR' ] }),
  logger
));

export default store;
