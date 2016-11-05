import React, {PropTypes} from 'react';
import {Table, Glyphicon, Pagination} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import chunk from 'lodash.chunk';
import sortBy from 'lodash.sortby';
import reverse from 'lodash.reverse';

import {DeleteModal, ActivateModal, DeactivateModal} from './../modals/AppModal';
import OutputField from './../common/OutputField';

class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sortField: 'name',
      sortAscending: true,
      rows: this.appendChkCheckedProperty(this.props.rows),
      activePage: 1,
      masterChecked: false,
      selectedId: []
    }
    this._selectedIdMap = new Map();

    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    //this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  appendChkCheckedProperty(rows) {
    if (this.isMassActionsAvailable()) {
      for (let row of rows) {
        row.chkChecked = false;
      }
    }
    return rows;
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      sortField: 'name',
      sortAscending: true,
      rows: this.appendChkCheckedProperty(nextProps.rows),
      masterChecked: false
    })
  }

  handleRowSelect(e, currentRow){
    currentRow.chkChecked = e.target.checked;
    this.setState({rows: this.state.rows});
    //this.props.handleSelectedDataTableRows(this.collectSelectedRowIds());
  }

  handleEdit(sObjectName, id) {
     browserHistory.push(`/edit/${sObjectName}/${id}`);
  }

  collectSelectedRowIds(){
    let selectedID = [];
    for(let row of this.state.rows){
      if(row.chkChecked){
        selectedID.push(row.id);
      }
    }
    return selectedID;
  }

  handlePageSelect(page) {
    this.setState({activePage: page});
  }

  handleCheckAll(e) {
    let chkStatus = e.target.checked;
    let rows = this.state.rows;
    for (let currentRow of rows) {
      currentRow.chkChecked = chkStatus;
    }
    this.setState({masterChecked:chkStatus,rows: rows});
    console.log('**state Set');
    //this.props.handleSelectedDataTableRows(this.collectSelectedRowIds());

  }

  handleSort(newSortField) {

    let sortAscending = true;
    if (this.state.sortField === newSortField) {
      sortAscending = !this.state.sortAscending;
    }
    let sortedRows = sortBy(this.state.rows, [newSortField]);
    if(!sortAscending) {
      reverse(sortedRows);
    }
    this.setState({rows: sortedRows,sortField: newSortField, sortAscending: sortAscending});
  }

  createActionLinks(record) {
    let actionArray = [];

    for (let actionLink of this.props.listViewActions) {

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
      if(actionLink.action == 'Edit'){
        actionArray.push(<a href="javascript:void(0)" onClick={e => this.handleEdit(this.props.sObjectName,record.id)} key={'edit' + record.id}>Edit</a>);
        actionArray.push(<span key={'edit' + record.id}> | </span>);
      }
      if(actionLink.action == 'Select'){
        actionArray.push(<a href="javascript:void(0)" onClick={e => this.props.handleActionLink(this.props.sObjectName,record)} key={'select' + record.id}>Select</a>);
        actionArray.push(<span key={'select' + record.id}> | </span>);
      }

    }

    if (actionArray.length > 0) {
      actionArray.pop();
      return actionArray;
    }

    return actionArray;

  }

  isMassActionsAvailable() {
    return (this.props.massActions && this.props.massActions.length > 0);
  }


  createTableRows() {
    const fields = this.props.listView;
    let tRows = [];


    if (this.state.rows && this.state.rows.length == 0) {
      let len = fields.length + 1;
      if (this.isMassActionsAvailable()) {
        len++;
      }
      return (<tr>
        <td colSpan={len}>No records to display</td>
      </tr>);
    }

    let pagedRows = chunk(this.state.rows, this.props.pageSize);
    let currentPageRows = pagedRows[this.state.activePage - 1];

    for (let currentRow of currentPageRows) {
      let tSingleRow = [];

      if (this.isMassActionsAvailable()) {
        tSingleRow.push(<td key={'MassAction' + currentRow.id}><input onChange={e=>{this.handleRowSelect(e, currentRow)}} type="checkbox" checked={currentRow.chkChecked}
                                                                      name={currentRow.id} id={currentRow.id}/></td>)
      }

      if (this.props.listViewActions && this.props.listViewActions.length > 0) {
        tSingleRow.push(<td key="Action" className="actionCol">{this.createActionLinks(currentRow)}</td>);
      }

      for (let currentField of fields) {
        let currentValue = currentRow[currentField.name];
        tSingleRow.push(<OutputField key={currentRow.id + currentField.name} record={currentRow} field={currentField}
                                     sObjectName={this.props.sObjectName}/>);
      }
      tRows.push(<tr key={currentRow.id}>{tSingleRow}</tr>);
    }
    return tRows;
  }

  createPaginationControl(){
    if(this.state.rows.length <= this.props.pageSize){
       return null;
    }
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={Math.ceil(this.state.rows.length / this.props.pageSize)}
        maxButtons={7}
        activePage={this.state.activePage}
        onSelect={this.handlePageSelect}/>
    );
  }

  createTableHeader() {
    const fields = this.props.listView;
    let tHeadArray = [];

    if (this.isMassActionsAvailable()) {
      tHeadArray.push(<th width={10} key={'MassAction'}><input type="checkbox" name="chkAll" checked={this.state.masterChecked}
                                                               onChange={e => {this.handleCheckAll(e)}}/></th>);
    }
    tHeadArray.push(<th key={'Action'}>Action</th>);

    for (let i = 0; i < fields.length; i++) {
      let currentField = fields[i];

      tHeadArray.push(<Theader key={currentField.name} name={currentField.name}
                               label={currentField.label} sortField={this.state.sortField}
                               onClick={() => this.handleSort(currentField.name)}
                               sortAscending={this.state.sortAscending}/>)
    }

    return (
      <thead>
      <tr>{tHeadArray}</tr>
      </thead>
    );

  }

  render() {
    return (
      <div>
        <Table striped condensed hover>
          {this.createTableHeader()}

          <tbody>
          {this.createTableRows()}
          </tbody>
        </Table>
        <div className="text-center">
          {this.createPaginationControl()}
        </div>

      </div>
    )
  }
}

export default DataTable;

DataTable.defaultProps = {
  pageSize: 5
}

/*****************************************************************
 * THeader row, displays a sortable table header, along with sort Click
 ****************************************************************/
const Theader = ({name, label, sortField, sortAscending, onClick}) => {

  let sortImage = null;

  if (sortField == name) {
    sortImage = <span className="sortImage">{sortAscending ? <Glyphicon glyph="triangle-top"/> :
      <Glyphicon glyph="triangle-bottom"/>}</span>;
  }

  return (
    <th aria-label={label}>
      <a href="javascript:void(0);" onClick={onClick}>
        {label}
      </a>
      {sortImage}
    </th>
  );
}
