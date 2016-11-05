import * as types from '../constants/actionTypes';

export function loginStart(credentials) {
  return {
    type: types.LOGIN_START,
    credentials: credentials
  }
}

export function loginSuccess(loginResult){
  return {
    type: types.LOGIN_SUCCESS,
    token: loginResult.token,
    user : loginResult.user,
  }
}

export function loginFailure(error){
  return {
    type: types.LOGOUT_FAILED,
    token: null,
    error: error
  }
}

export function logoutStart(){
  return {
    type: types.LOGOUT_START
  }
}

export function logoutFailure(){
  return {
    type: types.LOGOUT_FAILED
  }
}

export function logoutSuccess(){
  return {
    type: types.LOGOUT_SUCCESS
  }
}
