import React from 'react';
import {
  Well,
  FormGroup,
  Panel,
  Button,
  Row,
  Col,
  FormControl,
  ControlLabel,
  ListGroupItem,
  Glyphicon,
  Form
} from 'react-bootstrap';

class MassUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Panel header={'Mass Upload'}>
        <Row>
          <Col xs={12}>
            <p>
              Mass upload records in the database directly. This screen allows you to mass upload your data directly in
              the database

            </p>
          </Col>
        </Row>

        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Select Object
            </Col>
            <Col sm={6}>
              <FormControl componentClass="select" placeholder="select">
                <option value="">--None--</option>
                <option value="account">Account</option>
                <option value="announcement">Announcement</option>
                <option value="workOrder">Work Order</option>
                <option value="product">Product</option>
                <option value="user">User</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Template
            </Col>
            <Col sm={6}>
              <FormControl.Static>
                Template File Link
              </FormControl.Static>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>

            </Col>
            <Col sm={6}>
              <Button bsStyle={'success'}>Upload</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }

}

export default MassUpload;
