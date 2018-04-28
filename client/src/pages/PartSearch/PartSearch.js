import React, { Component } from 'react';
import AddBtn from '../../components/AddBtn';
import API from '../../utils/API';
import { Col, Row } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, FormBtn } from '../../components/Form';
import Axios from 'axios';
import SideNav from '../../components/SideNav';
import './PartSearch.css';

class PartSearch extends Component {
  state = {
    PartSearch: [],
    mfrNum: '',
    keyword: '',
    inventory:[],

    setQty: ''
  };

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

  handleAddBtnClick = (e, part) => {
    this.addPart(part);
    e.target.innerText = 'Added!';
    e.target.style.color = 'red';
    e.target.style.fontWeight = 'bold';
  }


  render() {
    return (
      <Row>
        <Col size="md-3">
          <SideNav />
        </Col> 

        <Col size="md-9">
          <div id='inputeSeacrForm'>
            <h3>Search Octopart For a Part</h3>

            <form style={{padding:'0px 0px 25px 0px'}}>

              <Input
                value={this.state.keyword}
                onChange={this.handleInputChange}
                name="keyword"
                placeholder="Keywords (required)"
              />

              <FormBtn
                disabled={!(this.state.keyword || this.state.mfrNum)}
                onClick={this.handleFormSubmit}
              >  Search Part
              </FormBtn>
              <br />
            </form>
          </div>

          <div id='searchResults'>
            {this.state.PartSearch.length ? (
              <List id='searchResultsList'>
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
                    <AddBtn onClick={(e) => this.handleAddBtnClick(e, part)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
        </Col>
      </Row> 
    );
  }
}

export default PartSearch;
