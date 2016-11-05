import React from 'react';
import {Tooltip,Glyphicon,OverlayTrigger,HelpBlock, Form, InputGroup, FormGroup, FormControl, Col, Row,
  ControlLabel,Checkbox, Button} from 'react-bootstrap';

class LookupField extends React.Component {

  constructor(props, context) {
    super(props, context);
    showPopup = this.showPopup.bind(this);
  }

  showPopup(){
    console.log('Open Popup ');
  }

  render(){
    return (
      <InputGroup>
        <FormControl type="text" />
        <InputGroup.Addon>
          <a href="javascript:void(0)" onClick={this.showPopup}><Glyphicon glyph="search"></Glyphicon></a>
        </InputGroup.Addon>
      </InputGroup>
    );
  }

}

export default LookupField;
