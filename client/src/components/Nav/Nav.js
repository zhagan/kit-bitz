import React from "react";
import "./Nav.css";

const Nav = () => (
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
    </div>
  </nav>
);

export default Nav;
