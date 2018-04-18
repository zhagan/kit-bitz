import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import {Navbar} from "react-bootstrap";

import { withUser } from "../../services/withUser";

import "./Nav.css";

class Nav extends Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-inverse navbar-top nav-custom">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="collapsed navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" /> <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a href="/" className="navbar-brand">
              Kit-Bitz
        </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
                {
                  user
                    ? (
                        <li className="dropdown">
                          <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{`Logged in as ${user.username}`}<span className="caret"></span></Link>
                          <ul className="dropdown-menu">
                            <li><Link to="#">Action</Link></li>
                          </ul>
                        </li>
                      )
                    : <li><Link to="/">Login</Link></li>
                }
          </ul>
        </div>
      </nav>
    );
  }
}

export default withUser(Nav);
