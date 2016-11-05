import React from 'react';
import {Link} from 'react-router';
import {Table, Form, Glyphicon, Tooltip, Col, FormGroup, Panel, Row, OverlayTrigger, Button} from 'react-bootstrap';

import {SectionHeaderDetail} from './../common/Navigation';
import TabPanel from './../common/TabPanel';
import GoogleChart from './../charts/GoogleChart';
import ChartPanelHeader from './../charts/ChartPanelHeader';
import PendingWorkOrder from './../charts/PendingWorkOrder';

const HomePage = () => {

  let homeTheme = {image: '/styles/images/home32.png', heading: 'Home', description: 'This is all about Home'};
  let dt = new Date();

  return (
    <div>

      <TabPanel selected={'home'}/>
      <SectionHeaderDetail image={homeTheme.image} heading={homeTheme.heading} description={dt.toDateString()}/>

      <Row>

        <Col xs={4}>
          <Panel header={<ChartPanelHeader dashboardId={'workOrderByUser'}  title={'Work Orders By User'} />}
                 bsStyle="info">
            <GoogleChart dashboardId={'workOrderByUser'} chartType={'PieChart'} chartId={'userWorkOrder'}/>
          </Panel>
        </Col>



      </Row>


      <Row>
      </Row>

    </div>
  );
};

export default HomePage;
