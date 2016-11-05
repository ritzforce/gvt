import React from 'react';
import Alert from 'react-s-alert';
import {Glyphicon} from 'react-bootstrap';

class Notify extends React.Component {
  constructor(props, context){
    super(props, context);
    this._lastLoadingAlertId = null;
  }

  deleteRecord(recordName){
    let msg = `<span><span class="glyphicon glyphicon-info-sign"></span> <b>${recordName}</b> deleted successfully </span>`;
    let result = Alert.info(msg, {
      position: 'top-right',
      offset: -15,
    });
  }

  saveRecord(recordName){
    let msg = `<span><span class="glyphicon glyphicon-info-sign"></span> <b>${recordName}</b> saved successfully </span>`;
    let result = Alert.info(msg, {
      position: 'top-right',
      offset: -15,
    });
  }

  loading(message){
    this.hide();
    let msg = `<span><span class="glyphicon glyphicon-refresh"></span> <b>${message}</span>`;
    this._lastLoadingAlertId = Alert.warning(msg, {
      position: 'top',
      offset: 15,
      timeout: 'none',
    });
  }

  hide(){
    console.log(this._lastLoadingAlertId);
    if(this._lastLoadingAlertId){
      Alert.close(this._lastLoadingAlertId);
    }
  }


}

const sNotify = new Notify();
export default sNotify;

