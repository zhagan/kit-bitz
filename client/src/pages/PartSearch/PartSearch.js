import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
  loadPartSearch = () => {
    // API.searchPart()
    //   .then(//res =>
    //     // this.setState({ PartSearch: res.data, mfrNum: "", keyword: ""})
    //   )
    //   .catch(err => console.log(err));
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

        API.searchPart(this.state.keyword)
        .then(res => {
          this.setState({ PartSearch: res });
          this.loadPartSearch();
        })
        .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

              <h3>Search Octopart For a Part</h3>

            <form>

              <Input
                value={this.state.keyword}
                onChange={this.handleInputChange}
                name="keyword"
                placeholder="Keywords (required)"
              />

              <FormBtn
                disabled={!(this.state.keyword || this.state.mfrNum)}
                onClick={this.handleFormSubmit}
              >
                Search Part
              </FormBtn>
            </form>
            <Row/>

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
                    <Input name="qty"></Input>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
              <h3>Parts in my Inventory</h3>
            {this.state.inventory.length ? (
              <List>
                {this.state.inventory.map(part => (
                  <ListItem key={part._id}>
                    <Link to={"/parts/" + part._id}>
                      <strong>
                        {part.snippet} {part.item.mfn}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deletePart(part._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PartSearch;
