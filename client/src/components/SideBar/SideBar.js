import React, { Component } from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import './SideBar.css';

import { withRouter,  } from 'react-router-dom';
import { circuitBoard } from 'react-icons-kit/oct/circuitBoard';
import { ic_view_list } from 'react-icons-kit/md/ic_view_list';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { plusCircle } from 'react-icons-kit/fa/plusCircle';


//specify the base color/background of the parent container if needed
class SideBar extends Component{

itemSelected = id =>{

  console.log('selected ' + id);
  this.props.history.push('/'+id);

}

render () {

  return (

    <div style={{height: 400}} id="sideBar">

      <SideNav highlightColor='#18a279' highlightBgColor='#B7B9C8'
        onItemSelection={ this.itemSelected}>

        <Nav bsStyle="pills" stacked id='parts'>
          <NavIcon><SvgIcon size={20} icon={ic_search}/></NavIcon>
          <NavText> Parts </NavText>

        </Nav>

        <Nav id='inventory'>

          <NavIcon><SvgIcon size={20} icon={ic_view_list}/></NavIcon>
          <NavText> Inventory </NavText>

        </Nav>
        <Nav id='kits'>
          <NavIcon><SvgIcon size={20} icon={circuitBoard}/></NavIcon>
          <NavText> Kits </NavText>
        </Nav>
        <Nav id='createkit'>
          <NavIcon><SvgIcon size={20} icon={plusCircle}/></NavIcon>
          <NavText> Create Kits </NavText>

        </Nav>
        <hr style={{width: 200}}/>

      </SideNav>
    </div>
  );
}
}

export default withRouter(SideBar);
