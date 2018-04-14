import React, {Component} from "react";
import "./leftSidebar.css";
import {Button, Navbar} from "react-bootstrap";


class LeftSidebar extends Component {
    render() {
        return (
            <div className="leftsidebar toggle-open toggle-close">
                <i className="fa fa-spinner fa-spin"></i><a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#settings">Settings</a>
                <a href="#team">Kit-Bitz Team</a>
                <a href="#contact">Contact</a>
            </div>
        );
    }
}

export default LeftSidebar;