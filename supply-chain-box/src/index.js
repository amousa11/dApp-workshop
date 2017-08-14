import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import newItemReducer from './components/NewItem/newItem.reducer';
import itemReducer from './components/Item/item.reducer';
import itemsReducer from './components/Items/items.reducer';
import homeReducer from './components/Home/home.reducer';

import watchNewItemSubmit from './components/NewItem/newItem.saga';
import watchInstantiateContract from './components/Home/home.saga';
import watchFetchItems from './components/Items/items.saga';

import App from "./App";

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  // YOUR REDUCERS HERE
  newItem: newItemReducer,
  item: itemReducer,
  items: itemsReducer,
  home: homeReducer
});

const rootSaga = function* startForeman() {
  yield [
    // YOUR SAGAS HERE
    fork(watchNewItemSubmit),
    fork(watchInstantiateContract),
    fork(watchFetchItems)
  ]
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
  //window.devToolsExtension ? window.devToolsExtension() : f => f,
);

// then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);