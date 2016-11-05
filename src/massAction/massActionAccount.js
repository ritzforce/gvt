import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Table, Form, Glyphicon, Tooltip, Col, FormGroup, Panel, Row, OverlayTrigger, Button} from 'react-bootstrap';

class MassActionAccount extends React.Component {

  constructor(args, context){
    super(args, context);
  }

  render() {
    return (
      <Panel>
        {this.props.action} = {this.props.selectedRowId}
      </Panel>)
  }
}

export default MassActionAccount;
