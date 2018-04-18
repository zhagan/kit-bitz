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
import SearchBar from "../../components/searchBar";
import BootstrapTable from 'react-bootstrap-table-next';


class PartSearch extends Component {
  state = {
    PartSearch: [],
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
          this.setState({ PartSearch: res.data.results });
        //  this.loadPartSearch();
        })
        .catch(err => console.log(err));
      }
    }
  };


   cellEditProp = event => {
      mode: 'dbclick'
    };


  render() {
    const columns = [{
       dataField: 'quantity',
       text: 'Product ID'
     }, {
       dataField: 'mpn',
       text: 'Product Name'
     }, {
       dataField: 'snippet',
       text: 'Product Price'
     }];

    return (
      <Container fluid>
      <Col size="md-3">
      <SearchBar />
      </Col>


          <Col size="md-9">

              <h3>Search Octopart For a Part</h3>

            <form>

              <Input
                value={this.state.keyword}
                onChange={this.handleInputChange}
                name="keyword"
                placeholder="Keywords (required)"
              />
              <br />
              <FormBtn
                disabled={!(this.state.keyword || this.state.mfrNum)}
                onClick={this.handleFormSubmit}
              >  Search Part
              </FormBtn>
            </form>


            {this.state.PartSearch.length ? (
              <List>
                {this.state.PartSearch.map((part, index) => (

                  <ListItem key={index}>
                  {part.item.imagesets.length > 0 &&
                    <img src={part.item.imagesets[0].small_image.url} alt=""></img>
                  }
                    <a href={part.item.octopart_url} target="_blank">
                      <strong>
                         {part.item.mpn}
                      </strong>
                    <p>{part.snippet}</p>
                    </a>
                    <AddBtn onClick={() => this.addPart(part)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
              <h3>Parts in my Inventory</h3>
            {this.state.inventory.length ? (
              <BootstrapTable keyField='id' data={ this.state.inventory } columns={ columns } />
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

      </Container>
    );
  }
}

export default PartSearch;
