import React from 'react';
import metadata from './../metadata';
import EditView from './../components/EditView';
import {browserHistory} from 'react-router';
import {SectionHeaderDetail} from './../common/Navigation';
import TabPanel from './../common/TabPanel';
import {Panel,Button} from 'react-bootstrap';

import Notify from './../services/Notify';
import Api from './../services/Api';


class EditViewPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.saveRecord = this.saveRecord.bind(this);
    this.reinitializeState(this.props.params.sObjectName, this.props.params.id);
  }

  reinitializeState(sObjectName, id, initialize = true){

    let state = {
      record: {},
      recordId: id,
      loading: (id ? true : false), //any loading elements in progress
      saving: false,
      theme: metadata[sObjectName].theme,
      sObjectName: sObjectName,
      isNew: (id ? false : true)
    }

    if(initialize){
      this.state = state;
    }
    else {
      this.setState({state});
    }

    if(id) {
      this.loadRecord(sObjectName, id);
    }
  }

  loadRecord(sObjectName, id){
    let that = this;
    Api.query(sObjectName, id).then( function (record) {
      that.setState( {record: record, loading: false} );
    });
  }

  saveRecord(record){

    debugger;
    this.setState({saving : true});
    Notify.loading('Saving...');

    let that = this;

    Api.save(this.state.sObjectName, Object.assign({},record))
      .then( function(result) {
        that.setState( { saving: false} );

        Notify.hide();
        Notify.saveRecord(result.name);
        return result;
      })
      .then(function(record){
        browserHistory.push(`/detail/${that.state.sObjectName}/${record.id}`);

      });
    //console.log(savedRecord);

  }

  /*componentWillMount(){
    console.log('Component will mount');
      if(!this.state.isNew) {
        let record = Api.query(this.state.sObjectName, this.state.recordId);
        this.setState({record: record});
    }
  }*/

  componentWillReceiveProps(nextProps) {
    this.reinitializeState(nextProps.params.sObjectName, nextProps.params.id, false);
  }

  getView(){
    let sObject = metadata[this.state.sObjectName];
    if(sObject.newView && this.state.isNew){
      return sObject.newView;
    }
    if(sObject.editView){
      return sObject.editView;
    }
    return sObject.detailView;
  }

  getSectionDescription(){
    if(this.state.isNew){
      return 'New ' + this.state.theme.label;
    }
    return 'Edit - ' + (this.state.record.name ? this.state.record.name : ' ');
  }


  render(){

    let sObject = metadata[this.state.sObjectName];
    let view = this.getView();

    console.log('***State.Record*');
    console.log(this.state.record);
    return (
      <div>
        <TabPanel selectedTab={this.state.sObjectName}/>
        <SectionHeaderDetail image={this.state.theme.image} heading={this.state.theme.label}
                             description={this.getSectionDescription()} />

        <EditView loading={this.state.loading} saving={this.state.saving}
                  saveRecord={this.saveRecord} sObject={sObject} sObjectName={this.state.sObjectName} initialValues={this.state.record}
                  isNew={this.state.isNew} theme={this.state.theme} view={view} />

      </div>
    );
  }
}

export default EditViewPage;
