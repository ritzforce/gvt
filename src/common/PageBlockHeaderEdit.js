import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Tabs, Tab, Media, Button, Grid, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

class PageBlockHeaderEdit extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  cancelClick(e) {
    if (this.props.isNew) {
      browserHistory.push(`/list/${this.props.sObjectName}`);
    }
    else {
      browserHistory.push(`/detail/${this.props.sObjectName}/${this.props.record.id}`);
    }
  }

  render() {

    let {sObjectName, theme, isNew, isSaveInProgress} = {...this.props};

    let title = isNew ? 'New ' : 'Edit ';

    let saveText = 'Save';
    let cancelText = 'Cancel';
    let saveAndNewText = 'Save & New';


    if (isSaveInProgress) {
      saveText = 'Saving...';
      cancelText = 'Saving...';
      saveAndNewText = 'Saving...';
    }

    return (
      <Row>
        <Col xs={5}>
          <div className="pull-left">
            <h4 className="pageBlockHeaderTitle">{title} {theme.label}</h4>
          </div>
        </Col>

        <Col xs={7}>
          <Button bsStyle="primary" type="submit" disabled={isSaveInProgress}>
            {saveText}
          </Button>
          &nbsp;&nbsp;
          <Button bsStyle="primary" type="submit" disabled={isSaveInProgress}>
            {saveAndNewText}
          </Button>
          &nbsp;&nbsp;
          <Button bsStyle="default" disabled={isSaveInProgress} onClick={e => { this.cancelClick(e)}}>
            {cancelText}
          </Button>
        </Col>

      </Row>
    )
  }
}

export default PageBlockHeaderEdit;
