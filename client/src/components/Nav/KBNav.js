import React, { Component } from 'react';
import { withRouter,  } from 'react-router-dom';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { update } from '../../services/withUser';

import axios from 'axios';

import './Nav.css';
import logo from './kit-bitz-logo-white.png';


class KBNav extends Component {
  handleLogoutClick = (e) => {
    e.preventDefault();
    axios.delete('/api/auth')
      .then(result => {
      // successful logout
        update(null);
        this.props.history.push('/');
      })
      .catch(error => {
      // failed logout
        console.log('Error logging out:', error);
      });
  }

  handleAccountClick = (e) => {
    e.preventDefault();

    this.props.history.push('/UserInfo');

  }

  render() {
    const { user } = this.props;

    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a href="">
                <img
                  src={logo}
                  alt="Kit-Bitz"
                  style={{height:'50px',
                    align:'top',
                    padding:'0px',
                    border:'0px'}}
                />
              </a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/parts">
              <NavItem eventKey={1} href="#">
                Parts
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/kits">
              <NavItem eventKey={2} href="#">
                Kits
              </NavItem>
            </LinkContainer>

          </Nav>
          <Nav pullRight>
            {
              user
                ?
                <NavDropdown eventKey={3} title={`Logged in as: ${user.username}`} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.handleLogoutClick}>Logout</MenuItem>
                  <MenuItem eventKey={3.2} onClick={this.handleAccountClick}>Account</MenuItem>
                </NavDropdown>
                :
                <LinkContainer to="/login">
                  <NavItem eventKey={3} href="#">
                  Login
                  </NavItem>
                </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(KBNav);
