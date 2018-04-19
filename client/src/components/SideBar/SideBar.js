import React, { Component, Fragment } from 'react';
import SideNav, { Nav, NavIcon, NavText, NavLink } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import FontAwesome from "react-fontawesome";
import "./SideBar.css";
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { withRouter,  } from 'react-router-dom';


//specify the base color/background of the parent container if needed
class SideBar extends Component{

itemSelected = id =>{

  console.log("selected " + id);
  this.props.history.push('/'+id);

}

render () {

    return (

    <div >

        <SideNav highlightColor='#00498B' highlightBgColor='#000B2A'
          onItemSelection={ this.itemSelected}>


            <Nav id='parts' >
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Parts </NavText>

            </Nav>

            <Nav id='inventory'>

                <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                <NavText> Inventory </NavText>

            </Nav>
            <Nav id='kits'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Kits </NavText>
            </Nav>
            <Nav id='createkit'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Create Kits </NavText>
            </Nav>
        </SideNav>
    </div>
)
}
}

export default withRouter(SideBar);
