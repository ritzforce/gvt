import React, {PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import {Collapse, Glyphicon, Col, Row} from 'react-bootstrap';

class PageBlockSection extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true
    }
  }

  toggleState(){
      if(this.props.allowCollapse) {
        this.setState({open: !this.state.open});
      }
  }

  render() {

    const {backgroundColor, children, title} = this.props;
    const glypicon = (this.state.open == true ?  <Glyphicon glyph="triangle-bottom"  /> : <Glyphicon glyph="triangle-right"  />)

    let section = null;

    if(this.props.allowCollapse){
      section =  <a href="javascript:void(0)" style={{textDecoration: 'none'}} onClick={(e) => this.toggleState()}>
        {glypicon} {title}
      </a>
    }
    else {
      section =  <a style={{textDecoration: 'none'}}>{title}</a>
    }

    return (
      <Row className="pageBlockSection">
        <Col xs={12} className="pageBlockSectionTitle" style={{backgroundColor: backgroundColor}}>
          {section}
        </Col>
        <Collapse in={this.state.open}>
          <div>
            <Row>
              <Col xs={1}></Col>
              <Col xs={10}>{children}</Col>
              <Col xs={1}></Col>
            </Row>
          </div>
         </Collapse>
      </Row>
    )
  }
}

export default PageBlockSection;
