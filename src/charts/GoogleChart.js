import {Chart} from 'react-google-charts';
import React from 'react'
import {Table, Form, Glyphicon, Tooltip, Col, FormGroup, Panel,Row, OverlayTrigger, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import metadata from './../metadata';

import Loading from '../common/Loading';
import {requestDashboardData} from '../actions/dashboardActions'

class GoogleChart extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.requestDashboardData(this.props.dashboardId);
  }

  render() {
    let dashboard = this.props.dashboard;
    let dashboardConfig = metadata.dashboard[this.props.dashboardId];
    
    if(dashboard.isRefreshInProgress) {
      return (<Loading />);
    }

    if(!dashboard.rows || dashboard.rows.length == 0){
      return (<div>No rows to display</div>);
    }
    
    return (
      <Chart chartType={this.props.chartType}
              rows={dashboard.rows} columns={dashboardConfig.columns} options={dashboardConfig.options}
             graph_id={this.props.chartId}  width={"100%"} height={"300px"}  legend_toggle={true} />
    );
  }
};

GoogleChart.defaultProps = {
  chartType: 'ScatterChart',
  chartId: 'scatterChartId'
}

const mapStateToProps = (state,ownProps) => {
  return {dashboard: state.dashboard[ownProps.dashboardId]};
};


export default connect(mapStateToProps,{requestDashboardData})(GoogleChart);
