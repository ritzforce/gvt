import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import metadata from './../metadata';
import TabPanel from './../common/TabPanel';
import {SectionHeaderDetail} from './../common/Navigation';
import MassActionAccount from './../massAction/massActionAccount';

class MassActionPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    let actionMetadata = this.getCurrentAction(this.props.params.sObjectName, this.props.params.action);

    //console.log(this.props.location.query);

    this.state = {
      sObjectName : this.props.params.sObjectName,
      action: this.props.params.action,
      selectedRowId: this.props.location.query.selectedRowId,
      actionMetadata: actionMetadata
    }
  }

  getCurrentAction(sObjectName, actionName) {
    debugger;
    let massActions = metadata[sObjectName].theme.massActions;
    for(let massAction of massActions){
      if(massAction.action == actionName){
        return massAction;
      }
    }
    return null;
  }

  getComponent() {
    if (this.state.sObjectName == 'account') {
      return <MassActionAccount action={this.state.action} selectedRowId={this.state.selectedRowId}/>
    }
  }

  render() {
    let theme = metadata[this.state.sObjectName].theme;
    return (
      <div>
        <TabPanel selectedTab={this.state.sObjectName}/>
        <SectionHeaderDetail image={theme.image} heading={this.state.actionMetadata.label} description={this.state.actionMetadata.description}/>

        {this.getComponent()}
      </div>
    )
  }

}


export default MassActionPage;
