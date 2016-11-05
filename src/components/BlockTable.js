import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Table, Form, Glyphicon, Tooltip, Col, FormGroup, Panel,Row, OverlayTrigger, Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import Loading from '../common/Loading';
import {DeleteModal, ActivateModal, DeactivateModal} from './../modals/AppModal';
import {CheckedBox,UncheckedBox} from './../common/OutputField';
import metadata from './../metadata';


class BlockTable extends React.Component{
  constructor(props, context){
    super(props, context);
    this.formatRowAction = this.formatRowAction.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.formatName = this.formatName.bind(this);
    this.formatCheckbox = this.formatCheckbox.bind(this);
  }

  formatRowAction(cell, row){
    let actionLinks = this.createActionLinks(row);
    return <span>{actionLinks}</span>;
  }

  handleEdit(sObjectName, id){
    browserHistory.push(`/edit/${this.props.sObjectName}/${id}`);
  }

  createActionLinks(record) {
    let actionArray = [];

    for (let actionLink of this.props.rowActions) {

      if (actionLink.action == 'Delete') {
        actionArray.push(<DeleteModal key={'del' + record.id} record={record} name={record.name}
                                      handleActionLink={this.props.handleActionLink}/>);
        actionArray.push(<span key={'sdel' + record.id}> | </span>)
      }
      if (actionLink.action == 'Activate' && record.active === false) {
        actionArray.push(<ActivateModal key={'activate' + record.id} record={record} name={record.name}
                                        handleActionLink={this.props.handleActionLink}/>)
        actionArray.push(<span key={'sactivate' + record.id}> | </span>)
      }
      if (actionLink.action == 'Deactivate' && record.active === true) {
        actionArray.push(<DeactivateModal key={'deactivate' + record.id} record={record} name={record.name}
                                          handleActionLink={this.props.handleActionLink}/>)
        actionArray.push(<span key={'deactivate' + record.id}> | </span>)
      }
      if (actionLink.action == 'Edit') {
        actionArray.push(<a href="javascript:void(0)" onClick={e => this.handleEdit(this.props.sObjectName,record.id)}
                            key={'edit' + record.id}>Edit</a>);
        actionArray.push(<span key={'sedit' + record.id}> | </span>);
      }
      if (actionLink.action == 'Select') {
        actionArray.push(<a href="javascript:void(0)"
                            onClick={e => this.props.handleActionLink(this.props.sObjectName,record)}
                            key={'select' + record.id}>Select</a>);
        actionArray.push(<span key={'select' + record.id}> | </span>);
      }
    }
    if (actionArray.length > 0) {
      actionArray.pop();
      return actionArray;
    }

    return actionArray;
  }


  formatName(cell, row){
    // Do not form a link, when opened in a Lookup Modal
    if(this.props.search) {
      return cell;
    }

    let retURL = '';
    if(this.props.retURL){
      retURL = '?retURL=' + this.props.retURL;
    }

    return <Link to={`/detail/${this.props.sObjectName}/${row.id}${retURL}`}>{cell}</Link>
  }

  formatCheckbox(cell, row){
    if(cell == true){
      return <CheckedBox/>
    }
    return <UncheckedBox/>

  }

  generateColumns(){
    let lstTableHeaderColumn = [];
    lstTableHeaderColumn.push(<TableHeaderColumn key={'id'} dataField="id" isKey={true} dataSort={true} hidden={true}>ID</TableHeaderColumn>);

    if(this.props.rowActions){
      lstTableHeaderColumn.push(<TableHeaderColumn width={'100'} key={'relatedList' + this.props.sObjectName} dataField="id" dataFormat={this.formatRowAction}>Action</TableHeaderColumn>);
    }

    for(let i = 0; i < this.props.fields.length;i++){
      let currentField = this.props.fields[i];
      if(currentField.name == 'name'){
        lstTableHeaderColumn.push(<TableHeaderColumn key={currentField.name} dataField="name" dataFormat={this.formatName} dataSort={true}>{currentField.label}</TableHeaderColumn>);
        continue;
      }
      if(currentField.formSubType == 'checkbox'){
        lstTableHeaderColumn.push(<TableHeaderColumn key={currentField.name} dataField={currentField.name} dataFormat={this.formatCheckbox} dataSort={true}>{currentField.label}</TableHeaderColumn>);
        continue;
      }
      lstTableHeaderColumn.push(<TableHeaderColumn key={currentField.name} dataField={currentField.name}  dataSort={true}>{currentField.label}</TableHeaderColumn>);
    }

    return lstTableHeaderColumn;
  }

  getSelectRow(){
    //Search will be true for Lookup Filter
    if(this.props.search){
      return {
        mode: "",
      }
    }

    return {
      mode: "checkbox",
      onSelect: (row, isSelected) => {
        this.props.handleSelectRow(row, isSelected);
      },
      onSelectAll: (isSelected) => {
        this.props.handleSelectAllRows(isSelected);
      }
    };
  }

  render(){

    console.log('this.props.loading***=>' + this.props.loading);

    if(this.props.loading == true){
      return (<Loading />);
    }

    return (
      <BootstrapTable selectRow={this.getSelectRow()} search={this.props.search} striped={true} hover={true} ignoreSinglePage={true} bordered={false} pagination={true}
                      condensed={true} data={this.props.rows}>
        {this.generateColumns()}
      </BootstrapTable>
    )
  }
}

BlockTable.defaultProps = {
  search: false
}

export default BlockTable;
