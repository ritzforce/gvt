import {LOGIN_START, LOGIN_SUCCESS,LOGIN_FAILED,
  LOGOUT_START,LOGOUT_FAILED,LOGOUT_SUCCESS} from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {

  switch(action.type){
    case LOGIN_START:
          return Object.assign({}, state, {isLoginInProgress: true});
    case LOGIN_SUCCESS:
          return {isAuthenticated: true, isLogoutComplete:false, isLoginInProgress: false,loginUser: action.user };
    case LOGIN_FAILED:
          return {isAuthenticated: false,isLoginInProgress: false, loginUser: {}};
    case LOGOUT_START:
          return Object.assign({},state, {isLogoutComplete: false});
    case LOGOUT_SUCCESS:
          return {isAuthenticated: false,isLogoutComplete: true, isLoginInProgress: false, loginUser: {}};
  }
  return state;
}
