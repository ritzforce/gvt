import React from 'react';
import {ToastContainer, ToastMessage} from 'react-toastr';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);


//var saveMessageOption = { 'closeButton': true, 'timeOut':2000,
//  'positionClass': 'toast-top-right'};


//var displayProgress = {'closeButton': false, 'extendedTimeOut': 0, tapToDismiss : false,
//  'positionClass': 'toast-top-center', 'timeOut': 0,'preventDuplicates': false};


class Notification extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentDidMount(){
    let {title, message } = {...this.props};

    this.refs.container.success(message,title, {
      closeButton: true,
    });
  }

  render(){
    return (
      <div>
      <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref="container"
        className="toast-top-center"/>
    </div>
        );
  }
}

export default Notification;
