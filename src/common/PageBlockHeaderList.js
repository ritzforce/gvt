import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Tabs, Tab, Media, Button, Grid, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

class PageBlockHeaderList extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      text: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.sObjectName !== this.props.sObjectName){
      this.setState({text: ''});
    }
  }

  handleOnChange(e){
    this.setState({text: e.target.value});
    this.props.handleFilterChange(e.target.value)
  }

  generateCustomButtons(theme){

    if(!theme.massActions){
      return null;
    }

    let customButtons = [];
    for (let btn of theme.massActions) {
      customButtons.push(<span key={btn.action}><Button onClick={e => {this.props.massButtonClick(btn.action)}} bsStyle={btn.buttonType}>{btn.label}</Button>&nbsp;&nbsp;</span>)
    }
    return customButtons;
  }

  render(){
    let {sObjectName, theme, handleFilterChange} = this.props;

    return (
      <Row>
        <Col xs={5}>
          <div className="pull-left">
            <h4 className="pageBlockHeaderTitle">{this.props.salutation} {theme.pluralLabel}</h4>
          </div>
          <div>
            &nbsp;&nbsp;{this.generateCustomButtons(theme)}
          </div>
        </Col>
        <Col xs={7}>
          <Button bsStyle="primary" onClick={e => { browserHistory.push(`/new/${sObjectName}`) }}>New {theme.label}</Button>
          <form className="pull-right form-inline">
            <input onChange={this.handleOnChange} value={this.state.text} type="text" className="form-control" placeholder={"Filter" +
           " " + theme.pluralLabel} size="30"/>
          </form>
        </Col>
      </Row>
    )
  }
}

PageBlockHeaderList.defaultProps = {
  salutation: 'All'
}


export default PageBlockHeaderList;
