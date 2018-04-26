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
import SideNav from "../../components/SideNav";
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import './Inventory.css';
import InventoryTable from "./InventoryTable/InventoryTable";

class Inventory extends Component {
  state = {
    mfrNum: "",
    keyword: "",
    inventory: [],
  };

  componentDidMount() {
    this.loadInventory();
  }

  loadInventory = () => {
    API.getParts()
      .then(res =>
        this.setState({ inventory: res.data })
      )
      .then(console.log(this.state.inventory))
      .catch(err => console.log(err));
  };

  deletePart = id => {
    API.deletePart(id)
      .then(res => this.loadInventory())
      .catch(err => console.log(err));
  };

  changeQtyPart = (id, newQty) => {
    API.changeQtyPart(id, newQty)
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
      if (this.state.keyword) {
        Axios.post('/api/parts/search/', { keyword: this.state.keyword })
          .then(res => {
            this.setState({ Inventory: res.data.results });
            //  this.loadInventory();
          })
          .catch(err => console.log(err));
      }
    }
  };

  handleQtyInputChange = (event) => {
    event.preventDefault();

    // grab new value of number input
    let newQty = event.target.value;

    // grab MPN for part
    let itemMPN = event.target.dataset.partId;

    // make request to update part quantity in user's inventory
    API.changeQtyPart(itemMPN, newQty).then( response => {
      console.log(response.data);
      this.loadInventory();
    })
  }


  render() {
    const columns = [{
      dataField: 'Qty',
      text: 'Qty'
    }, {
      dataField: 'MPN',
      text: 'MPN'
    }, {
      dataField: 'Snippet',
      text: 'Description'
    }, {
      dataField: 'button',
      dataFormat: this.cellButton,
      text: 'x'
    }];

    return (
      <Container fluid>
        <Col size="md-2">
          <SideNav />
        </Col>


        <Col size="md-9">

          <h3>Parts in my Inventory</h3>
          {this.state.inventory.length ? (
            <div id='inventoryTable'>
              <div className="table-responsive">
                <InventoryTable
                  inventory={this.state.inventory}
                  handleQtyInputChange={this.handleQtyInputChange}
                  handleDeletePart={this.deletePart}
                />
              </div>
            </div>
          ) : (
              <h3>No Results to Display</h3>
          )}
        </Col>

      </Container>
    );
  }
}

export default Inventory;
