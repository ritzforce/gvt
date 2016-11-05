import 'babel-polyfill';

import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from  '../sagas';
const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...
    sagaMiddleware,
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  ];

  let store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;

}
