import React from 'react';
import metadata from './../metadata';
import {SectionHeader, PageBlockHeader} from './../common/Navigation';
import PageBlockHeaderList from './../common/PageBlockHeaderList';
import {SectionHeaderMap} from './../common/Navigation';
import TabPanel from './../common/TabPanel';
import GoogleMaps from './../components/GoogleMaps';

import {Panel, Button, Row, Form, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import LookupModal from './../modals/LookupModal';

import DataTable from './../components/DataTable';
import BlockTable from './../components/BlockTable';
import {browserHistory} from 'react-router';
import Notify from './../services/Notify';

class Maps extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedUser: ''
    }
    this.handleChange = this.handleChange.bind(this);


  }

  handleChange(selectedUser){
    this.setState({selectedUser: selectedUser});
    console.log(selectedUser);
  }

  render() {
    return (
      <div>
        <TabPanel selectedTab={'maps'}/>
        <SectionHeaderMap image={'/styles/images/maps24.png'} heading={'Track'}
                          description={'Show Positions'}>

          <Form horizontal>

            <Col sm={5}>
              <LookupModal field={{reference:'user'}} value={this.state.selectedUser} onChange={this.handleChange} />
            </Col>

            <Col sm={3}>
              <DatePicker dateFormat={'DD/MM/YYYY'} placeholder="Enter Start Date" />
            </Col>

            <Col sm={3}>
              <DatePicker dateFormat={'DD/MM/YYYY'} placeholder="Enter End Date" />
            </Col>

          </Form>
        </SectionHeaderMap>

        <Panel header={<MapHeader/>}>
          <GoogleMaps />
        </Panel>
      </div>
    )

  }
}

const MapHeader = () => {
  return(<Row>
    <Col xs={2}>
      <b>Map</b>
    </Col>
    <Col xs={2}>
      &nbsp;
    </Col>
    <Col xs={2}>
      <span style={{color: 'green',fontWeight:'bold'}}>Green ( &lt; 15 mins )</span>
    </Col>
    <Col xs={2}>
      <span style={{color: 'blue',fontWeight:'bold'}}>Blue ( 15 mins &lt; 60 mins )</span>
    </Col>
    <Col xs={2}>
      <span style={{color: 'red',fontWeight:'bold'}}>Red  ( &gt; 60 mins )</span>
    </Col>
  </Row>);
}

const validate = (values, ownProps) => {
  return {};
}
/*
 export default reduxForm({
 form: 'editMap', // a unique identifier for this form
 validate: validate,
 enableReinitialize: true
 })(Maps)
 */

export default Maps;
