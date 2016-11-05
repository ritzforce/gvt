import React from 'react';
import {SectionHeaderDetail} from './../common/Navigation';
import metadata from './../metadata';
import PageBlockHeaderDetail from './../common/PageBlockHeaderDetail';
import TabPanel from './../common/TabPanel';
import ResetPassword from './../custom/ResetPassword';
import Message from './../custom/Message';

class CustomPage extends React.Component {

  constructor(props, context){
    super(props, context);
    let actionMetadata = this.getCurrentAction(this.props.params.sObjectName, this.props.params.action);


    this.state = {
      sObjectName : this.props.params.sObjectName,
      action: this.props.params.action,
      recordId: this.props.params.id,
      actionMetadata: actionMetadata
    }
  }

  getCurrentAction(sObjectName, actionName) {
    let detailActions = metadata[sObjectName].theme.detailActions;
    for(let detailAction of detailActions){
      if(detailAction.action == actionName){
        return detailAction;
      }
    }
    return null;
  }

  getComponent() {
    if (this.state.sObjectName == 'user' && this.state.action == 'reset') {
      return <ResetPassword recordId={this.state.recordId}/>
    }
    if (this.state.sObjectName == 'user' && this.state.action == 'message') {
      return <Message recordId={this.state.recordId}/>
    }
    return null;
  }

  render() {
    let theme = metadata[this.state.sObjectName].theme;

    return (
      <div>
        <TabPanel selectedTab={this.state.sObjectName}/>
        <SectionHeaderDetail image={theme.image} heading={this.state.actionMetadata.label}
                             description={this.state.actionMetadata.description}/>
        {this.getComponent()}
      </div>)
  }
}

export default CustomPage;
