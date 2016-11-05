import React from 'react';
import {Well, Panel, Button, Row, Col, ListGroupItem,Glyphicon } from 'react-bootstrap';
import {browserHistory} from 'react-router';

import {SectionHeaderDetail} from './../common/Navigation';
import TabPanel from './../common/TabPanel';
import MassUpload from './../components/MassUpload';
import Backup from './../components/Backup';

class SettingsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.showBackup = this.showBackup.bind(this);
    this.massUpload = this.massUpload.bind(this);

    this.state = {
      showBackup: true,
    }
  }

  showBackup(){
    this.setState({showBackup: true});
  }

  massUpload(){
    this.setState({showBackup: false});
  }

  getRHSComponent(){
    if(this.state.showBackup == true){
      return <Backup />;
    }
    return <MassUpload />

  }

  render() {

    let settingTheme = {image: '/styles/images/setting32.png', heading: 'Settings', description: 'Manager Global' +
    ' Settings' +
    ' for the App'};


    return (
      <div>
        <TabPanel selectedTab={''} />

        <SectionHeaderDetail image={settingTheme.image} heading={settingTheme.heading} description={settingTheme.description}/>

        <Row>
          <Col xs={3}>
             <Well>
               <ListGroupItem active>
                 <Glyphicon glyph="hdd" /> Database
               </ListGroupItem>
               <ListGroupItem>
                 <a href="javascript:void(0)" onClick={e => this.showBackup()}>Backup</a>
               </ListGroupItem>
               <ListGroupItem>
                 <a href="javascript:void(0)" onClick={e => this.massUpload()}>Mass Upload</a>
               </ListGroupItem>

             </Well>
          </Col>
          <Col xs={9}>
            {this.getRHSComponent()}
          </Col>
        </Row>

      </div>

    )
  }

}


export default SettingsPage;
