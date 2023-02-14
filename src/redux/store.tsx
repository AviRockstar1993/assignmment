import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
