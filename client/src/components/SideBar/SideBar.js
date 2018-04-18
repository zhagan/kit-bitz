import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import FontAwesome from "react-fontawesome";
import "./SideBar.css";
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';


//specify the base color/background of the parent container if needed
const SideBar = () => (
    <div >
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
            <Nav id='inventory'>
                <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                <NavText> Inventory </NavText>
            </Nav>
            <Nav id='kits'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Kits </NavText>
            </Nav>
            <Nav id='ceateKits'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Create Kits </NavText>
            </Nav>
            <Nav id='parts'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Parts </NavText>
            </Nav>
        </SideNav>
    </div>
)


export default SideBar;
