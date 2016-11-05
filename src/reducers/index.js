import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import {routerReducer} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr'

import fuelSavings from './fuelSavingsReducer';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  fuelSavings,
  toastr: toastrReducer,
  form: formReducer,
  routing: routerReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
