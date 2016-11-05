import React from 'react';
import metadata from './../metadata';
import {SectionHeader, PageBlockHeader} from './../common/Navigation';
import PageBlockHeaderList from './../common/PageBlockHeaderList';
import TabPanel from './../common/TabPanel';
import {Panel, Button} from 'react-bootstrap';
import DataTable from './../components/DataTable';
import BlockTable from './../components/BlockTable';
import {browserHistory} from 'react-router';
import Notify from './../services/Notify';

import Api from './../services/Api';

class ListViewPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.reinitializeState(props.params.sObjectName, true);
    this.handleActionLink = this.handleActionLink.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleMassAction = this.handleMassAction.bind(this);

    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleSelectAllRows = this.handleSelectAllRows.bind(this);
  }

  reinitializeState(sObjectName, isInitialized = false) {

    const state = {
      filterText: '', //If the user is filtering through the Table
      rows: [], //the table rows to be displayed
      loading: true, //any loading elements in progress
      loadingMessage: null, //the message to be shown
      success: false, //If the deletion or related message to be shown
      successMessage: '', //the message to be shown, when record deleted or operation complete.
      theme: metadata[sObjectName].theme,
      sObjectName: sObjectName,
      selectedRowId: {},
      filteredRows: []
    }
    if (isInitialized) {
      this.state = state;
    }
    else {
      this.setState(state);
    }
    this.loadAllRecords(sObjectName);
  }

  loadAllRecords(sObjectName){
    Api.queryAll(sObjectName).then(rows => {
      this.setState({loading: false, rows: rows, filteredRows: rows});
    });
  }

  handleMassAction(actionName) {
    let recordArr = [];
    for(let recordId in this.state.selectedRowId) {
      recordArr.push(recordId);
    }
    let selectedId = recordArr.join(',');

    browserHistory.push(`/massAction/${this.state.sObjectName}/${actionName}?selectedRowId=${selectedId}`);
  }

  handleSelectRow(row, isSelected) {

    let currentSelected = this.state.selectedRowId;
    if (isSelected) {
      currentSelected[row.id] = true;
    }
    else {
      delete currentSelected[row.id];
    }
    this.setState({selectedRowId: currentSelected});
  }

  handleSelectAllRows(isSelected) {
    let currentSelected = {};
    if (isSelected) {
      for (let row of this.state.filteredRows) {
        currentSelected[row.id] = true;
      }
    }
    else {
      currentSelected = {};
    }
    console.log('**selectAll***', currentSelected);
    this.setState({selectedRowId: currentSelected});
  }

  handleSelectedDataTableRows(selectedId) {
    console.log('selecteId***', selectedId);
    console.log(this);

    this.setState({selectedId: selectedId});
  }

  handleFilterChange(filterText) {
    let regexp = new RegExp(filterText, 'g');
    if (filterText == null || filterText == '') {
      this.setState({filteredRows: this.state.rows});
      return;
    }

    let filteredRows = [];

    for (let row of this.state.rows) {
      for (let column in row) {
        if (String(row[column]).match(regexp)) {
          filteredRows.push(row);
          break;
        }
      }
    }
    this.setState({filteredRows: filteredRows});
  }

  handleActionLink(action, record) {
    console.log(action);
    console.log(record);

    let that = this;

    if(action == 'delete'){
      Notify.loading('Deleting...');

      Api.deleteRecord(this.state.sObjectName, record).then(function(result){
        console.log('Result==>', result);
        Notify.hide();
        Notify.deleteRecord(record.name);

        that.setState({loading: true});
        that.loadAllRecords();
      });

    }
  }

  consoleLog() {
    //console.log('*this***');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Component will receive props' + nextProps.params.sObjectName);
    this.reinitializeState(nextProps.params.sObjectName);
  }

  render() {

    let listView = metadata[this.state.sObjectName].listView;
    let rows = this.state.rows;

    return (
      <div>
        <TabPanel selectedTab={this.state.sObjectName}/>

        <SectionHeader theme={this.state.theme}/>

        <Panel header={<PageBlockHeaderList sObjectName={this.state.sObjectName} massButtonClick={this.handleMassAction}
                      theme={this.state.theme} handleFilterChange={this.handleFilterChange} />}
               bsClass={this.state.sObjectName}>

          <BlockTable loading={this.state.loading} fields={listView} sObjectName={this.state.sObjectName}
                      rows={this.state.filteredRows}
                      rowActions={this.state.theme.listViewActions}
                      handleSelectRow={this.handleSelectRow}
                      handleSelectAllRows={this.handleSelectAllRows}
                      handleActionLink={this.handleActionLink}/>

        </Panel>

      </div>
    );
  }

}

export default ListViewPage;
