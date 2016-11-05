import React from 'react';
import defaultState from '../defaultState';
import EditView from './../components/EditView';
import {SectionHeaderDetail, PageBlockHeaderEdit} from './../common/Navigation';
import TabPanel from './../common/TabPanel';
import {reduxForm, Field} from 'redux-form';
import {Form, Panel, Button} from 'react-bootstrap';
import InputField from './../common/InputField';

import {toastr} from 'react-redux-toastr';
import notify from './../services/Notify';
import { Notification } from 'react-notification';


const toastrOptions = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  icon: 'toastr-icon-close-round',
  onShowComplete: () => console.log('SHOW: animation is done'),
  onHideComplete: () => console.log('HIDE: animation is done'),
  showCloseButton: true, // true by default
  removeOnHover: false,
  component: ( // this option will give you a func 'remove' as props
    <div>
      <span>Hello, World!</span>
    </div>
  )
}

class TestValidationPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      title: 'YEs',
      message: 'Good work'
    }
    this.addAlert = this.addAlert.bind(this);
    this.addNotification = this.addNotification.bind(this);
    console.log('***this.state**');
    console.log(this.state);

  }

  showLoading(){
    let noti = new notify();
    noti.loading();
  }


  addNotification() {
    console.log('***Add Notification called');
    console.log(this.state);
    this.setState({show: true, title: 'User', message: 'User record saved successfully'});
    console.log(this.state);
  }

  addAlert() {
  }

  getNotification() {
    console.log('**Get Notification**');
    console.log(this.state);
    console.log('***');

    if (this.state.show == false) {
      return null;
    }

  }


  render() {

    return (
      <div>Hello world !!!


        <button className="primary" onClick={e => {toastr.error('', '',toastrOptions)}}>
          Hello
        </button>

        &nbsp;

        <button className="primary" onClick={e => {this.showLoading()}}>
          Hello Notify Loading
        </button>

        &nbsp;

        <button onClick={this.addNotification}>
          Show Notification Dynamically
        </button>

      </div>
    );
  }
}


export default TestValidationPage;

