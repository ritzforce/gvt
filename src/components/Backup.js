import React from 'react';
import {Well, Panel, Button, Row, Col, ListGroupItem, Glyphicon} from 'react-bootstrap';

class Backup extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Panel header={'Backup Database'}>
        <Row>
          <Col xs={12}>
            <p>
              The application does not automatically back up the database. Please do regular backups to protect your data
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={'text-center'}>
            <Button bsStyle={'success'}>Start Backup</Button>
          </Col>
        </Row>
      </Panel>
    )
  }

}

export default Backup;
