import React, {Component} from 'react';
import './leftSidebar.css';
import FontAwesome from 'react-fontawesome';


class LeftSidebar extends Component {
  render() {
    return (
      <div className="toggle-open toggle-close">
        <div className="side-title">Hi</div>
            
        <div className="leftsidebar">
          <FontAwesome className="icon" name="coffee"/>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#settings">Settings</a>
          <a href="#team">Kit-Bitz Team</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
