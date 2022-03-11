import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/reducer';
import {watcher} from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const rootStore = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcher);
