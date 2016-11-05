import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Tabs, Tab, Media, Button, Grid, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {DeleteModalButton} from './../modals/AppModal';

class PageBlockHeaderDetail extends React.Component {

  constructor(props, context){
    super(props, context);
    this.customButtonClick = this.customButtonClick.bind(this);
  }

  customButtonClick(action){
    browserHistory.push(`/custom/${this.props.sObjectName}/${action}/${this.props.record.id}`);
  }

  getColSize(theme){
    if(!theme.detailActions || theme.detailActions.length == 0){
      return 7;
    }
    return 8;
  }

  generateCustomButtons(theme){

    if(!theme.detailActions){
      return null;
    }

    let customButtons = [];
    for (let btn of theme.detailActions) {
      customButtons.push(<span key={btn.action}><Button onClick={e => {this.customButtonClick(btn.action)}} bsStyle={btn.buttonType}>{btn.label}</Button>&nbsp;&nbsp;</span>)
    }
    return customButtons;
  }


  render() {
    let {sObjectName, theme, record, editClick,deleteClick, cancelClick} = this.props;
    let title = '';
    if(record && record.name) {
      title = record.name;
    }
    let colSize = this.getColSize(theme);


    return (
      <Row>
        <Col xs={12 - colSize}>
          <div className="pull-left">
            <h4 className="pageBlockHeaderTitle">{title}</h4>
          </div>
        </Col>

        <Col xs={colSize}>
          <Button bsStyle="primary" onClick={e => { editClick(e)}}>Edit</Button>
          &nbsp;&nbsp;
          <DeleteModalButton record={record} name={title} handleActionLink={deleteClick}/>
          &nbsp;&nbsp;
          {this.generateCustomButtons(theme)}
          <Button bsStyle="default" onClick={e => { cancelClick(e)}}>Cancel</Button>
          &nbsp;&nbsp;
        </Col>
      </Row>
    )
  }
}

export default PageBlockHeaderDetail;
