import React from 'react';
import {Tooltip,Glyphicon,OverlayTrigger,HelpBlock, Form, InputGroup, FormGroup, FormControl, Col, Row,
  ControlLabel,Checkbox, Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import classNames from 'classnames';

import LookupModal from './../modals/LookupModal';
//Controls Supported
//Text, Email, Date , TextArea, Select, Checkbox, Number
//TBD Multiselect, Lookup,

class InputField extends React.Component {
  constructor(args, context){
    super(args, context);
    this.handleLookupSelected = this.handleLookupSelected.bind(this);
  }

  handleLookupSelected(reference, record){
  }

  generateToolTip(field){

    if(!field.helpText){
      return null;
    }

    const tooltip = (
      <Tooltip id="tooltip">{field.helpText}</Tooltip>
    );

    return  (<OverlayTrigger placement="top" overlay={tooltip}>
      <a href="javascript:void(0)" className="helpIcon"><Glyphicon glyph="info-sign"></Glyphicon></a>
    </OverlayTrigger>);
  }

  generatePicklistValues(field){
    let picklistOptions = [];

    picklistOptions.push(<option key={'--'} value="">--None--</option>);
    for(let picklist of field.picklistValues){
      picklistOptions.push(<option key={picklist.value} value={picklist.value}>{picklist.label}</option>)
    }
    return picklistOptions;
  }

  generateFormType(field){

    if(field.formType == 'lookup'){
      return <LookupModal {...this.props.input} field={field}  />;
    }

    if(field.formType == 'checkbox'){
      return <Checkbox  {...this.props.input} checked={this.props.input.value} name={field.name} />
    }

    if(field.formSubType == 'date') {
      return <DatePicker {...this.props.input} dateFormat={'DD/MM/YYYY'} />;
    }


    if(field.formType == 'select'){
      return (
        <FormControl {...this.props.input} componentClass={field.formType} placeholder={field.placeholder}>
          {this.generatePicklistValues(field)}
        </FormControl>);
    }

    return  <FormControl {...this.props.input} name={field.name} type={field.formSubType} maxLength={field.maxLength} componentClass={field.formType}
                         placeholder={field.placeholder} />;
  }

  render(){

    let field = this.props.field;
    let meta = this.props.meta;

    let error = (meta.touched && meta.invalid) ? meta.error : null;
    let validationState = null;
    let helpBlock = null;

    let requiredMark = null;
    if(field.required){
      requiredMark = <span className={'required'}>*</span>;
    }

    if(error){
      validationState = 'error';
      helpBlock = <HelpBlock>{this.props.meta.error}</HelpBlock>
    }

    return (
      <FormGroup validationState={validationState}>

        <Col componentClass={ControlLabel} sm={4}>
          {requiredMark} {field.label}
        </Col>

        <Col sm={8}>
          {this.generateToolTip(field)}
          {this.generateFormType(field)}
          {helpBlock}
        </Col>
      </FormGroup>
    )
  }
}

export default InputField;
