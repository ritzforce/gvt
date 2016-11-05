import React from 'react';
import {browserHistory} from 'react-router';

class ResetPassword extends React.Component {
  render (){
    return (<div>
      Reset Password Form => {this.props.recordId}
    </div>)
  }
}

export default ResetPassword;
