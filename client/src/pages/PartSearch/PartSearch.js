import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
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

  };

  componentDidMount() {
    this.loadPartSearch();
  }

  loadPartSearch = () => {
    // API.searchPart()
    //   .then(//res =>
    //     // this.setState({ PartSearch: res.data, mfrNum: "", keyword: ""})
    //   )
    //   .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadPartSearch())
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

      if(this.state.mfrNum){
    //  API.searchPart(this.state.mfrNum)
      API.searchPart(this.state.mfrNum)
        .then(res => {
          this.setState({ PartSearch: res.data });
          this.loadPartSearch();
        })
        .catch(err => console.log(err));
    }
    else{
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
            <Jumbotron>
              <h1>Search Octopart For a Part</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.mfrNum}
                onChange={this.handleInputChange}
                name="mfrNum"
                placeholder="Manufacturer Number (required)"
              />
              or <br/>

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
            {this.state.PartSearch.length ? (
              <List>
                {this.state.PartSearch.map(part => (
                  <ListItem key={part._id}>
                    <Link to={"/PartSearch/" + part._id}>
                      <strong>
                        {part.snippet} {part.item.mpn}
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
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Parts in my Inventory</h1>
            </Jumbotron>
            {this.state.PartSearch.length ? (
              <List>
                {this.state.PartSearch.map(part => (
                  <ListItem key={part._id}>
                    <Link to={"/PartSearch/" + part._id}>
                      <strong>
                        {part.mfrNum} {part.keyword}
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
