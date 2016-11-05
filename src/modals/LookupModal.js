import React from 'react';
import {
  Modal,
  OverlayTrigger,
  Glyphicon,
  HelpBlock,
  Form,
  InputGroup,
  FormGroup,
  FormControl,
  Col,
  Row,
  ControlLabel,
  Checkbox,
  Button
} from 'react-bootstrap';

import metadata from './../metadata';
import Api from './../services/Api';
import BlockTable from './../components/BlockTable';


class LookupModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      loading: true,
    }
    this.handleActionLink = this.handleActionLink.bind(this);
    //this.handleOnChange = this.handleOnChange.bind(this);
    //this.handleSelectRow = this.handleSelectRow.bind(this);
  }

  close() {
    this.setState({showModal: false});
  }

  loadAllRecords(sObjectName){
    Api.queryAll(sObjectName).then(rows => {
      this.setState({loading: false, rows: rows });
    });
  }

  //handleSelectRow(row, isSelected) {
  //  console.log(row);
  //}

  open() {
    this.setState({showModal: true, loading: true});
    this.loadAllRecords(this.props.field.reference);
  }

  handleActionLink(sObjectName, record) {
    console.log(sObjectName);
    console.log(record);

    //this.setState({value : record.name});
    //this.props.value = record.name;

    this.props.onChange(record.name);

    //debugger;
    //if(this._lookupInput){
    //  this._lookupInput.value = record.name;
    //}

    this.close();
  }

  getSelectRow(){
    return {
      mode: "",
    };
  }


  //handleOnChange(e){
  //  let filterText = e.target.value;
  //}

  //okClick() {
  //  this.props.handleActionLink(this.props.buttonMode, this.props.record);
  //  this.close();
  //}

  getCancel() {
    return (<div>
      <Button onClick={e => {this.close()}}>Cancel</Button>
    </div>);
  }

  render() {

    console.log('***this.props***', this.props);

    //let field = this.props.field;

    let {field, ...rest} = this.props;

    //console.log('**REST**', {...rest});

    let sObject = metadata[field.reference];
    let listView = sObject.listView;
    let theme = sObject.theme;

    return (<InputGroup>
      <FormControl type="text" {...rest}  name={field.name}  />
      <InputGroup.Addon>
        <a href="javascript:void(0)" onClick={e=> {this.open()}}>
          <Glyphicon glyph="search"></Glyphicon>
        </a>
      </InputGroup.Addon>

      <Modal show={this.state.showModal} bsSize="large" onHide={e => {this.close()}} bsStyle={'primary'}>

        <Modal.Header closeButton>
          <Modal.Title>{'Lookup ' + theme.label}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={12}>
              <BlockTable loading={this.state.loading} search={true}
                          rowActions={ [{action: 'Select'}]}
                          fields={listView} sObjectName={'account'}
                          handleActionLink={this.handleActionLink}
                          rows={this.state.rows} />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {this.getCancel()}
        </Modal.Footer>
      </Modal>

    </InputGroup>);
  }
}

LookupModal.defaultProps = {
  title: 'Look up',
  sObjectName: 'account'
}


export default LookupModal;
