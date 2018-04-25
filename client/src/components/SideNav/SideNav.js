import React, { Component, Fragment } from 'react';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import SvgIcon from 'react-icons-kit';
import FontAwesome from "react-fontawesome";
import styles from './SideNav.css';

import { withRouter,  } from 'react-router-dom';

import { circuitBoard } from 'react-icons-kit/oct/circuitBoard';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_view_list } from 'react-icons-kit/md/ic_view_list';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { plusCircle } from 'react-icons-kit/fa/plusCircle';


//specify the base color/background of the parent container if needed
class SideNav extends Component{

itemSelected = id =>{

  console.log("selected " + id);
  this.props.history.push('/'+id);

}

render () {

    return (

            <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
        <Navbar fluid className={styles.sidebar} inverse >

            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Kit-Bitz</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Navbar.Text className={styles.userMenu}>
                    <Navbar.Link href="#"><Glyphicon glyph="home"/></Navbar.Link>
                    <Navbar.Link href="#"><Glyphicon glyph="log-out"/></Navbar.Link>
                </Navbar.Text>
                <Nav>
                    <NavDropdown eventKey={1} title="Item 1">
                        <MenuItem eventKey={1.1} href="#">Parts</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={2}>Inventory</NavItem>
                    <NavItem eventKey={3}>Kits</NavItem>
                    <NavItem eventKey={4}>Create Kits</NavItem>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    </div>
)
}
}

export default withRouter(SideNav);
