import React, {PropTypes} from 'react';
import {Table, Form, Glyphicon , Tooltip, Col, FormGroup, Row, OverlayTrigger, Button} from 'react-bootstrap';
import defaultState from '../defaultState';
import PageBlockSection from './../common/PageBlockSection';
import FormLabel from './../common/Label';
import InputField from './../common/InputField';
import OutputField, {HelpText} from './../common/OutputField';
import Loading from '../common/Loading';

class DetailView extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  generateFieldSections() {
    let fieldSections = [];

    let view = this.props.view;
    let theme = this.props.sObject.theme;
    let record = this.props.record || {};

    for (let i = 0; i < view.length; i++) {
      let currentView = view[i];
      let fieldRows = this.generateFieldRows(currentView, record);
      fieldSections.push(<PageBlockSection allowCollapse={true} key={currentView.name} backgroundColor={theme.themeColor}
                                           title={currentView.name}><Table condensed><tbody>{fieldRows}</tbody></Table>
                        </PageBlockSection>);
    }
    return fieldSections;
  }

  generateFieldRows(currentView, record){
    let outputFields = [];
    let outputFieldRows = [];

    for (let fieldIndex = 0; fieldIndex < currentView.fields.length; fieldIndex++) {
      let currentField = currentView.fields[fieldIndex];
      let fieldValue = record[currentField.name];


      outputFields.push(<td key={currentField.name} className="detailLabel">{currentField.label}</td>);
      outputFields.push(<HelpText key={'h' + currentField.name} helpText={currentField.helpText} />);
      outputFields.push(<OutputField key={'o' + currentField.name} record={this.props.record} field={currentField} listView={false} sObjectName={this.props.sObjectName} />);

      if (this.breakRow(fieldIndex, currentView.cols)) {
        outputFieldRows.push(<tr key={fieldIndex}>{outputFields}</tr>);
        outputFields = [];
      }
    }

    if (outputFields.length > 0) {
      outputFieldRows.push(<tr key={100}>{outputFields}<td>&nbsp;</td></tr>);
    }

    return outputFieldRows;
  }

  breakRow(fieldIndex, maxCols) {
    if (fieldIndex === 0) return false;
    if ((fieldIndex + 1) % maxCols == 0) return true;

    return false;
  }

  render() {
    let theme = defaultState.metadata['account'].theme;

    const tooltip = (
      <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    );
    console.log('&&&&&&&&&&&&&&&&&&&&&&', this.props.loading);

    if(this.props.loading){
      return <Loading />;
    }

    return (
      <div>
        {this.generateFieldSections()}
      </div>
    )
  }

}

export default DetailView;
