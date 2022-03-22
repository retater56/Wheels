import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './reducers/rootReducer';
import {rootWatcher} from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const rootStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootWatcher);
