import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {logoutStart} from '../actions/loginActions';

class Header extends React.Component {

  constructor(props, context){
    super(props, context);
    this.logoutClick = this.logoutClick.bind(this);
  }

  logoutClick() {
    console.log('**logout Start Called***');
    this.props.logoutStart();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isLogoutComplete) {
      browserHistory.push('/login');
    }
  }

  getRightDisplay() {
    if (!this.props.isAuthenticated) {
      return null;
    }

    return (
      <span>
         <Navbar.Text pullRight>
          <a href="javascript:void(0)" onClick={this.logoutClick}><span style={{color:'yellow',paddingRight:20}}>Logout</span></a>
        </Navbar.Text>
        <Navbar.Text pullRight>
          <span> | </span>
        </Navbar.Text>
        <Navbar.Text pullRight>
          <Link to="/settings"><span style={{color:'yellow'}}>Settings</span></Link>
        </Navbar.Text>
        <Navbar.Text pullRight>
          <span> | </span>
        </Navbar.Text>
        <Navbar.Text pullRight><span style={{color:'yellow'}}>Welcome {this.props.user.name}</span></Navbar.Text>
      </span>
    );
  }

  render() {
    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" style={{padding:0,color:'yellow'}}>
              <div><img src="/styles/images/logo.png"/> <span>GVT Project</span></div>
            </a>
          </Navbar.Brand>
        </Navbar.Header>

        {this.getRightDisplay()}

      </Navbar>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.loginUser,
    isLogoutComplete: state.auth.isLogoutComplete
  }
};

export default connect(mapStateToProps, {logoutStart})(Header);
