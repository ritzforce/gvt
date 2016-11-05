import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {

  const newState = Object.assign({},state);
  const currentDashboard = Object.assign({},state[action.dashboardId]);

  const currentDashboardId = action.dashboardId;

  switch(action.type){

    case types.DASHBOARD_REFRESH_START:
          currentDashboard.isRefreshInProgress = true;
          return {...newState, [action.dashboardId]: {...currentDashboard}};

    case types.DASHBOARD_REFRESH_SUCCESS:
          currentDashboard.isRefreshInProgress = false;
          currentDashboard.rows = [...action.rows];
          return {...newState, [action.dashboardId]: {...currentDashboard}};

    case types.DASHBOARD_REFRESH_FAILURE:
          currentDashboard.isRefreshInProgress = false;
          currentDashboard.error = action.error;
          return {...newState, [action.dashboardId]: {...currentDashboard}};
  }

  return state;
}
