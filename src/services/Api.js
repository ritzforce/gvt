import MockData from './MockData';
import DashboardMockData from './DashboardMockData';
import {SubmissionError} from 'redux-form';
import {call, put} from 'redux-saga/effects'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class Api {

  constructor() {
    this._token = null;
  }

  isAuthTokenPresent() {
    return !!this._token;
  }

  logout() {
    this._token = null;
    return true;
  }

  login(credentials) {
    if (credentials.username != null && credentials.password != null) {

      this._token = 'ABC';

      return ({
        token: 'ABC',
        user: {
          name: 'The Administrator',
          role: 'Lord of the Rings'
        }
      });
    }

    return {
      token: null
    }

  }

  * queryAllDelay(sObjectName) {
    console.log('here111');
    yield delay(50000);
    console.log('here');
    yield MockData[sObjectName];
  }

  queryRelatedList(sObjectName, id) {
    let delay = 20;
    const that = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let lst = {};
        if (sObjectName == 'account') {
          lst['workOrder'] = that.queryAll('workOrder');
        }
        resolve(lst);
      }, delay);
    });


  }

  queryAll(sObjectName) {
    let delay = 5;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(MockData[sObjectName]);
      }, delay);
    });
    /*
     for(let result of this.queryAllDelay(sObjectName)){
     lastResult = result;
     }
     return lastResult;
     //yield delay(500);
     //return MockData[sObjectName]; */
  }

  query(sObjectName, recordId) {
    let delay = 150;
    const that = this;

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(that.queryInternal(sObjectName, recordId));
      }, delay);
    });

  }

  queryInternal(sObjectName, recordId) {
    for (let record of MockData[sObjectName]) {
      if (record.id == recordId) {
        return record;
      }
    }
    return null;
  }

  loadDashboard(dashboardId) {
    return DashboardMockData[dashboardId];
  }

  deleteRecord(sObjectName, record) {
    let delay = 5000;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let allRecords = MockData[sObjectName];
        for (let index = 0; index < allRecords.length; index++) {
          if (allRecords[index].id === record.id) {
            allRecords.splice(index, 1);
            break;
          }
        }
        resolve(record);

      }, delay);
    });
  }

  save(sObjectName, record) {

    let delay = 50;
    const that = this;

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        //Update case, ignore for now
        if (record.id) {
          let records = MockData[sObjectName];
          for(let index = 0; index < records.length; index++){
            if(records[index].id === record.id){
              records[index] = Object.assign({}, record);
              resolve(record);
            }
          }
        }
        else {
          let records = MockData[sObjectName];
          record.id = 50 + Math.floor(Math.random() * 1000);
          records.push(record);

          resolve(record);

        }
      }, delay);
    });
  }
}

let api = new Api();
export default api;
