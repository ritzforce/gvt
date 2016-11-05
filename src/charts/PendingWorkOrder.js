import React from 'react';
import {Link} from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {CheckedBox,UncheckedBox} from './../common/OutputField';
import {connect} from 'react-redux';

import Loading from '../common/Loading';
import {requestDashboardData} from '../actions/dashboardActions'


class PendingWorkOrder extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  componentWillMount(){
    this.props.requestDashboardData(this.props.dashboardId);
  }

  formatStatus(cell, row){
    if(cell == 'Pending'){
      return <span style={{color:'red'}}>{cell}</span>;
    }
    if(cell == 'Scheduled'){
      return <span style={{color:'green'}}>{cell}</span>;
    }
    return '';
  }

  formatName(cell, row){
    return <Link to={`/detail/workOrder/${row.id}`}>{cell}</Link>
  }

  formatActive(cell, row){
    if(cell == true){
      return <CheckedBox/>
    }
    return <UncheckedBox/>

  }

  render(){

    let dashboard = this.props.dashboard;
    //let dashboardConfig = metadata.dashboard[this.props.dashboardId];

    if(dashboard.isRefreshInProgress) {
      return (<Loading />);
    }

    if(!dashboard.rows || dashboard.rows.length == 0){
      return (<div>No rows to display</div>);
    }

    return (
      <BootstrapTable striped={true} hover={true} ignoreSinglePage={true} bordered={false} pagination={true} condensed={true} data={dashboard.rows}>
        <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataFormat={this.formatName} dataSort={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="active" dataFormat={this.formatActive} dataSort={true}>Active</TableHeaderColumn>
        <TableHeaderColumn dataField="status" dataFormat={this.formatStatus} dataSort={true}>Status</TableHeaderColumn>
        <TableHeaderColumn dataField="dueDate" dataSort={true}>Due Date</TableHeaderColumn>
      </BootstrapTable>
    )

  }
}

const mapStateToProps = (state,ownProps) => {
  return {dashboard: state.dashboard[ownProps.dashboardId]};
};

export default connect(mapStateToProps,{requestDashboardData})(PendingWorkOrder);
