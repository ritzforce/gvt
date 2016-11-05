import React from 'react';
import {Col, ControlLabel} from 'react-bootstrap';

//Simple Form Label to cover a Column  space
const FormLabel = ({label}) => {
  return (
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
  )
}

export default FormLabel;
