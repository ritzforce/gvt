import React from 'react';
import {browserHistory} from 'react-router';

class Message extends React.Component {
  render (){
    return (<div>
      Message Form => => {this.props.recordId}
    </div>)
  }
}

export default Message;
