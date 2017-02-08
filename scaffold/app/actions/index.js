import * as example from './example.action';
import { bindActionCreators } from 'redux';
import store from '../store';

const actions = Object.assign({}, example);
export default bindActionCreators(actions, store.dispatch);
