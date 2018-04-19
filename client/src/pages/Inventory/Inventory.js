import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import QtyBox from "../../components/QtyBox";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from 'axios';
import SideBar from "../../components/SideBar";
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';


class Inventory extends Component {
  state = {
    mfrNum: "",
    keyword: "",
    inventory:[],
  };

  componentDidMount() {
    this.loadInventory();
  }

  loadInventory = () => {
    API.getParts()
      .then( res =>
         this.setState({ inventory: res.data})
      )
      .catch(err => console.log(err));
  };

  deletePart = id => {
    API.deletePart(id)
      .then(res => this.loadInventory())
      .catch(err => console.log(err));
  };

  changeQtyPart = id => {
    API.changeQtyPart(id)
      .then(res => this.loadInventory())
      .catch(err => console.log(err));
  };

  addPart = part => {
    API.addPart(part)
      .then(res => this.loadInventory())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.mfrNum || this.state.keyword) {
      if(this.state.keyword){
        Axios.post('/api/parts/search/', { keyword: this.state.keyword })
        .then(res => {
          this.setState({ Inventory: res.data.results });
        //  this.loadInventory();
        })
        .catch(err => console.log(err));
      }
    }
  };

  cellButton(cell, row, enumObject, rowIndex) {
   return (
      <button
         type="button"
         onClick={() =>
         this.onClickProductSelected(cell, row, rowIndex)}
      >
      Click me { rowIndex }
      </button>
   )
 }


  render() {
    const columns = [{
       dataField: 'quantity',
       text: 'Qty'
     }, {
       dataField: 'mpn',
       text: 'MPN'
     }, {
       dataField: 'snippet',
       text: 'Description'
     }, {
       dataField:'button',
       dataFormat: this.cellButton,
       text: 'x'
    }];

    return (
      <Container fluid>
      <Col size="md-2">
      <SideBar />
      </Col>


          <Col size="md-9">

              <h3>Parts in my Inventory</h3>
            {this.state.inventory.length ? (

              <BootstrapTable keyField='_id'
                data={ this.state.inventory }
                columns={ columns }
                >
                <TableHeaderColumn
                  dataField='button'
                  dataFormat={this.cellButton.bind(this)}>x</TableHeaderColumn>
                </BootstrapTable>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

      </Container>
    );
  }
}

export default Inventory;
