import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Tabs, Tab, Media, Button, Grid, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {DeleteModalButton} from './../modals/AppModal';


//--------------------------------------Tabs-------------------------------------------------------------------//
export const TabPanel = ({displayTabs, selectedTab}) => {
  return (
    <Tabs defaultActiveKey={selectedTab}>
      {displayTabs.map(tab => {
        let tabTitle = getTabTitle(tab)

        return <Tab eventKey={tab.name} title={tabTitle}/>
      })}
    </Tabs>
  )
}


function getTabTitle(tab) {
  let img = null;
  if (tab.image) {
    img = <img src={tab.image}/>
  }

  return <span key={tab.title}>
    {img} {tab.title}
    </span>;
}

//-------------------------------------------------------------------------------------------------------------------//

export const SectionHeader = ({theme}) => {
  return (

    <div className="sectionTitle">
      <Media>
        <Media.Right>
          <img src={theme.image}/>
        </Media.Right>
        <Media.Right>
          <Media.Heading>{theme.pluralLabel}</Media.Heading>
          <Media.Body>
            <span>{theme.description}</span>
          </Media.Body>
        </Media.Right>
      </Media>
    </div>
  )
}

export const SectionHeaderMap = ({image, heading, description, children}) => {

  return (
    <div className="sectionTitle">
      <Row>
        <Col xs={2}>
          <Media>
            <Media.Right>
              <img src={image}/>
            </Media.Right>
            <Media.Right>
              <Media.Heading>{heading}</Media.Heading>
              <Media.Body>
                <span>{description}</span>
              </Media.Body>
            </Media.Right>
          </Media>
        </Col>
        <Col xs={10}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export const SectionHeaderDetail = ({image, heading, description}) => {
  return (

    <div className="sectionTitle">
      <Media>
        <Media.Right>
          <img src={image}/>
        </Media.Right>
        <Media.Right>
          <Media.Heading>{heading}</Media.Heading>
          <Media.Body>
            <span>{description}</span>
          </Media.Body>
        </Media.Right>
      </Media>
    </div>
  )
}


export const FluidPanel = ({children}) => {
  return (
    <div className="container-fluid">
      {children}
    </div>
  )
}

//-------------------------------------Header--------------------------------------------------------------------//
export const PageBlockHeader = ({sObjectName, theme, handleFilterChange}) => {

  return (
    <Row>
      <Col xs={5}>
        <div className="pull-left">
          <h4 className="pageBlockHeaderTitle">All {theme.pluralLabel}</h4>
        </div>
      </Col>
      <Col xs={7}>
        <Button bsStyle="primary"
                onClick={e => { browserHistory.push(`/new/${sObjectName}`) }}>New {theme.label}</Button>
        <form className="pull-right form-inline">
          <input onChange={e => handleFilterChange(e.target.value)} type="text" className="form-control" placeholder={"Filter" +
           " " + theme.pluralLabel} size="30"/>
        </form>
      </Col>
    </Row>
  )
}

//-------------------------------------------------------------------------------------------------------//
export const Footer = ({}) => {
  return (
    <div className="container-fluid">
      <footer>
        <hr/>
        <p className="text-center">© 2016 GVT Softwares</p>
      </footer>
    </div>
  )
}
