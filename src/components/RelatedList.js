import React, {PropTypes} from 'react';
import {Panel,Button} from 'react-bootstrap';

import PageBlockHeaderList from './../common/PageBlockHeaderList';
import DataTable from './DataTable';
import BlockTable from './BlockTable';

import metadata from './../metadata';

class RelatedList extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      filteredRows: [
        {id: 1, name: 'Workorder 1',active: true,status: 'Pending',dueDate:'1/1/2016'},
        {id: 2, name: 'Workorder 2', active: true,status:'Complete',dueDate:'1/1/2016'}
      ],
    }
    this.handleActionLink = this.handleActionLink.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleMassAction = this.handleMassAction.bind(this);

  }

  handleMassAction(actionName){
    console.log(actionName);
  }

  handleActionLink(action, record) {
    console.log(action);
    console.log(record);
    //this.consoleLog();
  }

  handleFilterChange(filterText){
    /*
    let regexp = new RegExp(filterText, 'g');
    if(filterText == null || filterText == '') {
      this.setState({filteredRows: this.state.rows});
      return;
    }

    let filteredRows =  [];

    for (let row of this.state.rows) {
      for (let column in row) {
        if (String(row[column]).match(regexp)) {
          filteredRows.push(row);
          break;
        }
      }
    }
    this.setState({filteredRows: filteredRows});
    */
  }


  componentWillReceiveProps(){
  }

  render(){

    let theme = metadata[this.props.sObjectName].theme;
    //let listView = metadata[this.props.masterSObjectName].
    console.log(this.props.listView);

    return (
      <Panel header={<PageBlockHeaderList salutation={'Related'} sObjectName={this.props.sObjectName} massButtonClick={this.handleMassAction}
                      theme={theme} handleFilterChange={this.handleFilterChange} />} bsClass={this.props.sObjectName}>

        <BlockTable fields={this.props.listView.fields} sObjectName={this.props.sObjectName}
                    rows={this.state.filteredRows}
                    retURL={this.props.retURL}
                    rowActions={this.props.listView.listActions}
                    handleActionLink={this.handleActionLink}/>
      </Panel>
    )
  }

}



export default RelatedList;
