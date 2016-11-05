/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Alert from 'react-s-alert';

import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico

import './styles/css/bootstrap.min.css'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the
// associated
import './styles/css/animate.css';
import './styles/css/s-alert-default.css';
import './styles/css/bouncyflip.css';
import './styles/css/react-bootstrap-table.css';
import './styles/css/map-icons.css';
import './styles/app.css';
// loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <Alert stack={{limit: 3}} html={true} effect='bouncyflip' timeout={6000} />
    </div>
  </Provider>, document.getElementById('app')
);
