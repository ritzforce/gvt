import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import * as types from '../constants/actionTypes';
import * as loginActions from '../actions/loginActions';
import Api from '../services/Api';


function* logout(action){
  console.log('logout async invoked');
  const result = yield call([Api, Api.logout]);
  if(result){
    yield put(loginActions.logoutSuccess(result));
  }
  else {
    yield put(loginActions.logoutFailure(result));
  }
}

function* loginAsync(action) {

  const result = yield call([Api,Api.login],action.credentials);
  if(result.token !== null){
    yield put(loginActions.loginSuccess(result));
  }
  else {
    yield put(loginActions.loginFailure('Unable to login'));
  }
}

export default function* watchLogin() {
  console.log('**watch login***');
  yield [
    takeEvery(types.LOGIN_START, loginAsync),
    takeEvery(types.LOGOUT_START, logout)
  ];
}
