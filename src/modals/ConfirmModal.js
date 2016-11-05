import React from 'react';
import {Modal, Button, OverlayTrigger} from 'react-bootstrap';

class ConfirmModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  getButtons(){
    if(this.props.buttonMode == 'delete'){
      return this.getDeleteCancel();
    }
    if(this.props.buttonMode == 'activate'){
      return this.getActivateCancel();
    }
    if(this.props.buttonMode == 'deactivate'){
      return this.getDeactivateCancel();
    }
    return null;
  }

  okClick(){
    this.props.handleActionLink(this.props.buttonMode, this.props.record);
    this.close();
  }

  getButtonOrLink(){
    if(this.props.renderAsLink){
      return (<a href="javascript:void(0)" onClick={e => {this.open()}}>{this.props.linkText}</a>);
    }
    return  <Button bsStyle={this.props.modalStyle} onClick={e => {this.open()}}>{this.props.linkText}</Button>
  }

  getDeleteCancel() {
    return (<div>
      <Button bsStyle="danger" onClick={e => {this.okClick()}}>Delete</Button>
      <Button onClick={e => {this.close()}}>Cancel</Button>
    </div>);
  }


  getDeactivateCancel() {
    return (<div>
      <Button bsStyle="danger" onClick={e => {this.okClick()}}>Deactivate</Button>
      <Button onClick={e => {this.close()}}>Cancel</Button>
    </div>);
  }

  getActivateCancel() {
    return (<div>
      <Button bsStyle="success" onClick={e => {this.okClick()}}>Activate</Button>
      <Button onClick={e => {this.close()}}>Cancel</Button>
    </div>);
  }

  render() {

    return (<span>
      {this.getButtonOrLink()}

      <Modal show={this.state.showModal} onHide={e => {this.close()}} bsStyle={this.props.modalStyle}>

        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.body}
        </Modal.Body>

        <Modal.Footer>
          {this.getButtons()}
        </Modal.Footer>
      </Modal>

    </span>);

  }
}


ConfirmModal.defaultProps = {
  modalStyle: "primary",
  title: 'Modal heading',
  body: 'body',
  buttonMode: 'delete',
  renderAsLink: true,
  linkText: 'Del'
}

export default ConfirmModal;
