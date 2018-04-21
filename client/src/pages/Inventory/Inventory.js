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
import './Inventory.css';

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

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <button
        type="button"
        onClick={() =>
          this.onClickProductSelected(cell, row, rowIndex)}
      >
        Click me {rowIndex}
      </button>
    )
  }

  handleQtyInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
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
          <SideBar />
        </Col>


        <Col size="md-9">

          <h3>Parts in my Inventory</h3>
          {this.state.inventory.length ? (
            <div id='inventoryTable'>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>MPN</th>
                      <th>Snippet</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.inventory.map( item => {
                        return (
                          <tr>
                            <td>
                              <input type="number" className="form-control text-center"
                              defaultValue={item.Qty}
                              onChange={this.handleQtyInputChange}
                              />
                            </td>
                            <td>{item.MPN}</td>
                            <td>{item.Snippet}</td>
                            <td><button onClick={() => this.deletePart(item.MPN)} className="btn btn-danger btn-sm">✘</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
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
