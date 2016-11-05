import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {reduxForm , Field} from 'redux-form';
import {Form, Col, Row, Panel, Button} from 'react-bootstrap';
import PageBlockHeaderEdit from './../common/PageBlockHeaderEdit';
import InputField from './../common/InputField';
import PageBlockSection from './../common/PageBlockSection';
import Loading from '../common/Loading';

class EditView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generateFieldSections() {
    let fieldSections = [];

    let view = this.props.view;
    let theme = this.props.sObject.theme;
    let record = this.props.initialValues || {};

    for (let i = 0; i < view.length; i++) {
      let currentView = view[i];
      let fieldRows = this.generateFieldRows(currentView, record);
      fieldSections.push(<PageBlockSection allowCollapse={false} key={currentView.name} backgroundColor={theme.themeColor}
                                           title={currentView.name}>{fieldRows}</PageBlockSection>);
    }
    return fieldSections;
  }

  handleSubmit(values){
    console.log('**submitted**');
    console.log(values);
    this.props.saveRecord(values);
  }

  generateFieldRows(currentView, record) {
    let outputFields = [];
    let outputFieldRows = [];


    for (let fieldIndex = 0; fieldIndex < currentView.fields.length; fieldIndex++) {
      let currentField = currentView.fields[fieldIndex];
      let fieldValue = record[currentField.name];

      //let inputField = <InputField key={fieldIndex + currentField.name} value={fieldValue} field={currentField}/>
      outputFields.push(<Col  key={fieldIndex + currentField.name} sm={6}> <Field name={currentField.name} component={InputField}
                                value={fieldValue}  field={currentField}/></Col>);


      if (this.breakRow(fieldIndex, currentView.cols)) {
        outputFieldRows.push(<Row key={fieldIndex}>{outputFields}</Row>);
        outputFields = [];
      }
    }

    if (outputFields.length > 0) {
      outputFieldRows.push(<Row key={100}>{outputFields}<Col xs={6}><div></div></Col></Row>);
    }

    return outputFieldRows;
  }

  breakRow(fieldIndex, maxCols) {
    if (fieldIndex === 0) return false;
    if ((fieldIndex + 1) % maxCols == 0) return true;

    return false;
  }


  render(){

    if(this.props.loading == true){
      return (<Panel bsClass={this.props.sObjectName}><Loading /></Panel>);
    }


    return (
         <Form horizontal onSubmit={this.props.handleSubmit(this.handleSubmit)}>
           <Panel header={<PageBlockHeaderEdit  sObjectName={this.props.sObjectName}
                          isNew={this.props.isNew} record={this.props.initialValues}
                          isSaveInProgress={this.props.saving} theme={this.props.theme} />}
                          bsClass={this.props.sObjectName}>
             <div style={{backgroundColor:"#f8f8f8"}}>
               {this.generateFieldSections()}
             </div>
           </Panel>
        </Form>
     )
  }
}

const extractAllFields = (view) => {
  let fields = [];
  //debugger;

  for(let index = 0; index < view.length; index++){
    let currentBlock = view[index].fields;
    for(let fieldIndex = 0; fieldIndex < currentBlock.length;fieldIndex++){
      fields.push(currentBlock[fieldIndex]);
    }
  }

  return fields;
}

const validate = (values, ownProps) => {

  //Capture all errors in a box;
  const errors = {};

  let fields = extractAllFields(ownProps.view);
  for(let field of fields){
    if(field.required == true && !values[field.name]) {
      errors[field.name] = field.label + ' is  required' ;
    }
  }

  for(let field of fields){
    if(field.datatype == 'email' && values[field.name]) {
      let email = values[field.name];
      if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
        errors[field.name] = field.label + ' email address is invalid';
      }
    }
  }

  return errors;
}

export default reduxForm({
  form: 'editSObject', // a unique identifier for this form
  validate: validate,
  enableReinitialize: true
})(EditView)
