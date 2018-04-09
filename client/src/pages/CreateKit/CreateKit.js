import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from 'axios';

class CreateKit extends Component {
  state = {
    MyKits: [],
    kitName: "",


  };

  componentDidMount() {
  //  this.loadInventory();
  }

  loadInventory = () => {
    API.getParts()
      .then( res =>
         this.setState({ inventory: res.data})
      )
      .catch(err => console.log(err));
  };
  loadCreateKit = () => {
    // API.searchPart()
    //   .then(//res =>
    //     // this.setState({ CreateKit: res.data, mfrNum: "", keyword: ""})
    //   )
    //   .catch(err => console.log(err));
  };

  deleteKit = id => {
    // API.deletePart(id)
    //   .then(res => this.loadInventory())
    //   .catch(err => console.log(err));
  };

  addKit = kit => {
    // API.addPart(part)
    //   .then(res => this.loadInventory())
    //   .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    alert(
      `Selected file - ${this.bomFileInput.files[0].name}`
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

              <h3>Create a Kit</h3>

            <form>
              <Input
                value={this.state.kitName}
                onChange={this.handleInputChange}
                name="kitName"
                placeholder="Kit Name (required)"
              />
              <label>
                Upload file:
                <input
                  type="file"
                  ref={input => {
                    this.bomFileInput = input;
                  }}
                />
              </label>
              <br />
              <FormBtn
                disabled={!(this.state.kitName)}
                onClick={this.handleFormSubmit}
              >
                Search Part
              </FormBtn>
            </form>
            <Row/>


          </Col>
          <Col size="md-6 sm-12">
              <h3>My Kits</h3>
              {this.state.MyKits.length ? (
                <List>
                  {this.state.MyKits.map((kit, index) => (

                    <ListItem key={index}>

                    //kit list
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

export default CreateKit;
