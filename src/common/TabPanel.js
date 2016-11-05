import React from 'react';
import {browserHistory} from 'react-router';
import {Tabs, Tab} from 'react-bootstrap';

import metadata from './../metadata';

class TabPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSelect(key) {
     let selectedTab = metadata.displayTabs.filter(tab => tab.name === key);
     browserHistory.push(selectedTab[0].url);
  }

  getTabTitle(tab) {
    let img = null;
    if (tab.image) {
      img = <img src={tab.image}/>
    }

    return <span key={tab.title}>
    {img} {tab.title}
    </span>;
  }

  render() {

    let displayTabs = metadata.displayTabs;

    return (
      <Tabs defaultActiveKey={this.props.selectedTab} activeKey={this.props.selectedTab} onSelect={this.handleSelect} id="topTabs">
        {displayTabs.map(tab => {
          let tabTitle = this.getTabTitle(tab)
          return <Tab eventKey={tab.name} key={tab.name} title={tabTitle}/>
        })}
      </Tabs>
    )
  }
}

export default TabPanel;
