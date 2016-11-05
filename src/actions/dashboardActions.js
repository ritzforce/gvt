import * as types from '../constants/actionTypes';

/*
export function loadDashboard(){
  return {
    type: types.DASHBOARD_LOAD
  }
}*/

export function startRefreshDashboard(dashboardId){
  return {
    type: types.DASHBOARD_REFRESH_START,
    dashboardId: dashboardId
  }
}

//Check if needed to refresh data
export function requestDashboardData(dashboardId){
  return {
    type: types.DASHBOARD_REQUEST_DATA,
    dashboardId: dashboardId
  }
}

export function successRefreshDashboard(dashboardId, rows){
  return {
    type: types.DASHBOARD_REFRESH_SUCCESS,
    dashboardId: dashboardId,
    rows: rows
  }
}

export function failureRefreshDashboard(dashboardId, error){
  return {
    type: types.DASHBOARD_REFRESH_FAILURE,
    dashboardId: dashboardId,
    error: error
  }
}

