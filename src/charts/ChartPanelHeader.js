import {Chart} from 'react-google-charts';
import React from 'react'
import {Table, Form, Glyphicon, Tooltip, Col, FormGroup, Panel,Row, OverlayTrigger, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {startRefreshDashboard} from '../actions/dashboardActions'


class ChartPanelHeader extends React.Component {
  constructor(props, context){
    super(props, context);

    this.refreshChartData = this.refreshChartData.bind(this);
  }

  refreshChartData(){
    this.props.startRefreshDashboard(this.props.dashboardId);
  }


  render(){
    let refreshText = this.props.dashboard.isRefreshInProgress ? 'Refreshing...': 'Refresh';

    return (
      <Row>
        <Col xs={6}>
          {this.props.title}
        </Col>
        <Col xs={6}>
          <div className="pull-right">
            <a href="javascript:void(0)" onClick={this.refreshChartData}>
              <Glyphicon glyph="refresh" /> {refreshText}
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return { dashboard: state.dashboard[ownProps.dashboardId]};
};


export default connect(mapStateToProps,{startRefreshDashboard})(ChartPanelHeader);


