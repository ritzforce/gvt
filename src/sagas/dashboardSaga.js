import { takeEvery, delay } from 'redux-saga'
import { fork, select, take, call, put } from 'redux-saga/effects'

import * as types from '../constants/actionTypes';
import * as dashboardActions from '../actions/dashboardActions';
import Api from '../services/Api';


/*
function* dashboardRefresh(action){
  yield call(delay, 5);
  console.log('&&&&&&&&&&&&' + action.dashboardId);

  const rows = yield call([Api, Api.loadDashboard], action.dashboardId);
  console.log('%%%%%%%',rows);

  if(rows != null) {
    yield put(dashboardActions.successRefreshDashboard(action.dashboardId, rows));
  }
  else {
    yield put(dashboardActions.failureRefreshDashboard(action.dashboardId, 'Error in loading dashboard'));
  }
}
*/

const currentDashboard = state => {
   return state.dashboard;
}

function* loadDashboard(dashboardId){
  yield call(delay,5000);
  const rows = yield call([Api, Api.loadDashboard], dashboardId);

  if(rows != null) {
    yield put(dashboardActions.successRefreshDashboard(dashboardId, rows));
  }
  else {
    yield put(dashboardActions.failureRefreshDashboard(dashboardId, 'Error in loading dashboard'));
  }
}


function* startDashboardDataWatch(){
  while(true){
    const {dashboardId} = yield take(types.DASHBOARD_REQUEST_DATA);
    const currentState = yield select();
    const currentDashboard = currentState.dashboard[dashboardId];

    //If the rows are already present
    if(!currentDashboard.rows){
      yield put(dashboardActions.startRefreshDashboard(dashboardId));
      //yield fork(loadDashboard, dashboardId);
    }
  }
}
function* startDashboardRefreshWatch() {
  while(true){
    const {dashboardId} = yield take(types.DASHBOARD_REFRESH_START);
    yield fork(loadDashboard, dashboardId);
  }
}


export default function* watchDashboard() {
  yield fork(startDashboardDataWatch);
  yield fork(startDashboardRefreshWatch);
}
