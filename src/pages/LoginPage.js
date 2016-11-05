import React from 'react';
import {Row, Col, Panel, Form, Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import InputField from './../common/InputField';
import {loginStart} from '../actions/loginActions'


class LoginPage extends React.Component {

  constructor(props, context){
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLoginField() {
    return {
      name: 'username',
      label: 'Username',
      required: false,
      datatype: 'email',
      formType: 'input',
      formSubType: 'email'
    };
  }

  getPasswordField() {
    return {
      name: 'password',
      label: 'Password',
      required: false,
      datatype: 'String',
      formType: 'input',
      formSubType: 'password'
    };
  }

  componentDidMount(){
    console.log('Component mounted');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthenticated){
      browserHistory.push('/');
    }
  }

  handleSubmit(values){
    this.props.loginStart({username: values.username, password: values.password});
  }

  render() {
    let loginField = this.getLoginField();
    let passwordField = this.getPasswordField();

    return (
      <Row>
        <Col xs={4}></Col>
        <Col xs={4}>
          <Panel header={'Login'} bsStyle="primary">
            <Form horizontal noValidate onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <Row>
                <Col xs={12}>
                  <Field name={loginField.name} component={InputField}
                         field={loginField}/>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Field name={passwordField.name} component={InputField}
                         field={passwordField}/>
                </Col>
              </Row>

              <Row>
                <Col xs={5}></Col>
                <Col xs={7}>
                  <Button type="submit" bsStyle={"primary"}>Login</Button>
                </Col>
              </Row>

            </Form>
          </Panel>

          <i className="text-center">Login Hint admin@admin.com / admin</i>

        </Col>
        <Col xs={4}></Col>
      </Row>
    )
  }
}

const validate = (values, ownProps) => {
  const errors = {};

  if(!values['username']){
    errors['username'] = 'Username is required';
  }
  if(!values['password']){
    errors['password'] = 'Password is required';
  }

  console.log(values['username']);

  if(values['username']){
    let email = values['username'];
    if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
      errors['username'] = 'Username must be in the form of email address e.g. a@a.com';
    }
  }

  return errors;
}

let loginReduxForm = reduxForm({
  form: 'Login', // a unique identifier for this form
  validate: validate,
})(LoginPage)

const mapStateToProps = state => {
  return {isAuthenticated : state.auth.isAuthenticated};
}

export default connect(mapStateToProps, {loginStart} )(loginReduxForm);
