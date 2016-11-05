import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import metadata from './../metadata';
import DetailView from './../components/DetailView';
import {SectionHeaderDetail} from './../common/Navigation';
import PageBlockHeaderDetail from './../common/PageBlockHeaderDetail';
import TabPanel from './../common/TabPanel';
import RelatedList from './../components/RelatedList';
import Loading from '../common/Loading';
import Notify from './../services/Notify';

import Api from './../services/Api';

class DetailViewPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.reinitializeState(this.props.params.sObjectName, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('***component will receive props***', nextProps);
    //debugger;
    //this.setState({loading: true, record: {}, relatedListLoading: true, relatedListRecords: {} });
    this.reinitializeState(nextProps.params.sObjectName, nextProps.params.id, true);
  }

  reinitializeState(sObjectName, id, isInitialized = false) {
    let state = {
      recordId: id,
      record: null, //the table rows to be displayed
      loading: true, //any loading elements in progress
      loadingMessage: null, //the message to be shown
      success: false, //If the deletion or related message to be shown
      successMessage: '', //the message to be shown, when record deleted or operation complete.
      theme: metadata[sObjectName].theme,
      sObjectName: sObjectName,
      relatedListLoading: true,
      relatedListRecords: {},
    }
    if (isInitialized) {
      this.setState(state);
    }
    else {
      this.state = state;
    }
    this.loadRecord(sObjectName, id);
  }

  loadRecord(sObjectName, recordId) {
    //debugger;
    let that = this;
    Api.query(sObjectName, recordId).then(record => {
      that.setState({loading: false, record: record});
    });
    Api.queryRelatedList(sObjectName, recordId).then(response => {
      that.setState({relatedListLoading: false, relatedListRecords: response});
    });
  }

  deleteClick() {

    let that = this;
    Notify.loading('Deleting...');

    Api.deleteRecord(this.state.sObjectName, this.state.record).then(function (record) {
      Notify.hide();
      Notify.deleteRecord(record.name);

      that.cancelClick();
    });
  }

  editClick() {
    browserHistory.push(`/edit/${this.state.sObjectName}/${this.state.record.id}`);
  }

  cancelClick() {
    debugger;
    const returnURL = this.props.location.query.retURL;
    if(returnURL){
      browserHistory.push(returnURL);
      return;
    }

    browserHistory.push(`/list/${this.state.sObjectName}`);
  }


  generateRelatedLists() {
    let relatedListArr = [];
    let currentSObject = metadata[this.state.sObjectName];

    if (!currentSObject.detailViewRelatedLists) {
      return null;
    }
    let retURL = `/detail/${this.state.sObjectName}/${this.state.recordId}`;

    for (let relatedList of currentSObject.detailViewRelatedLists) {
      relatedListArr.push(<RelatedList key={relatedList.sObjectName} retURL={retURL}
                                       listView={relatedList} sObjectName={relatedList.sObjectName}/>)
    }

    return relatedListArr;
  }


  render() {
    let sObject = metadata[this.state.sObjectName];
    let view = metadata[this.state.sObjectName].detailView;
    let recordName = 'Loading...';

    if (this.state.record && this.state.record.name) {
      recordName = this.state.record.name;
    }

    let relatedLists = <Loading loadingText="Loading Related Lists..." />;
    if (!this.state.relatedListLoading) {
      relatedLists = this.generateRelatedLists();
    }

    return (
      <div>

        <TabPanel selectedTab={this.state.sObjectName}/>
        <SectionHeaderDetail image={this.state.theme.image} heading={this.state.theme.label}
                             description={recordName}/>

        <Panel header={<PageBlockHeaderDetail record={this.state.record} deleteClick={this.deleteClick} editClick={this.editClick} cancelClick={this.cancelClick}
              sObjectName={this.state.sObjectName} theme={this.state.theme} />}
               bsClass={this.state.sObjectName}>

          <DetailView sObject={sObject} view={view} record={this.state.record} loading={this.state.loading}
                      theme={this.state.theme}/>
        </Panel>
        {relatedLists}
      </div>
    );
  }
}

export default DetailViewPage;
