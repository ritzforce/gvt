import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './pages/HomePage';
import ListViewPage from './pages/ListViewPage';
import EditViewPage from './pages/EditViewPage';
import DetailViewPage from './pages/DetailViewPage';
import CustomPage from './pages/CustomPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import MassActionPage from './pages/MassActionPage';
import MapsPage from './pages/Maps';

import TestValidationPage from './pages/TestValidationPage';
import Api from './services/Api';

import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="/list/:sObjectName" component={ListViewPage} onEnter={requireAuth}/>
    <Route path="/new/:sObjectName" component={EditViewPage}  onEnter={requireAuth} />
    <Route path="/edit/:sObjectName/:id" component={EditViewPage}  onEnter={requireAuth}/>
    <Route path="/detail/:sObjectName/:id" component={DetailViewPage}  onEnter={requireAuth}/>
    <Route path="/custom/:sObjectName/:action/:id" component={CustomPage}  onEnter={requireAuth}/>
    <Route path="/login" component={LoginPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/maps" component={MapsPage} />
    <Route path="/massAction/:sObjectName/:action" component={MassActionPage} />
    <Route path="/validation" component={TestValidationPage} />

  </Route>
);

function requireAuth(nextState, replace){

  if (!Api.isAuthTokenPresent()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  
}
