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
    file: null
  };

  componentDidMount() {
    this.loadKits();
  }

  loadKits = () => {
    API.getMyKits()
      .then( res =>
         this.setState({ MyKits: res.data})
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
  //  const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('kitName',this.state.kitName)
    formData.append('file',this.state.file);
    console.log(formData.get('kitName'));
    API.addKit(
      formData

       // {kitName: this.state.kitName,
       // bom: this.state.bom}
    )
      .then(res => this.loadKits())
      .catch(err => console.log(err));
    // alert(
    //   `Selected file - ${this.bomFileInput.files[0].name}`
    // );
  };

  onChangeFile = event => {
    this.setState({file:event.target.files[0]})
  }

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
                  name="file"
                  onChange={this.onChangeFile}
                />
              </label>
              <br />
              <FormBtn
                disabled={!(this.state.kitName)}
                onClick={this.handleFormSubmit}
              >
              Create Kit
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
                    <Link to={"/mykits/" + kit._id}>
                      <strong>
                        {kit.kitName} created by {kit.createdBy.username}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteKit(kit._id)} />
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
