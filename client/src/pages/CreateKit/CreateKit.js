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
import Papa from 'papaparse';

//variable to store parsed BOM from file upload
let parsedBOM;

class CreateKit extends Component {
  state = {
    MyKits: [],
    kitName: "",
    BOM: null,
    designer: "",
    kitUrl: "",
    pcbUrl: "",
    faceplateUrl: ""

  };

  componentDidMount() {
    this.loadKits();
  }

  loadKits = () => {
    API.getMyKits()
      .then(res =>
        this.setState({ MyKits: res.data })
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
    API.deleteKit(id)
      .then(res => this.loadKits())
      .catch(err => console.log(err));
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

    formData.append('kitName', this.state.kitName);
    formData.append('BOM', JSON.stringify(parsedBOM)); // send BOM as a string
    formData.append('designer', this.state.designer);
    formData.append('kitUrl', this.state.kitUrl);
    formData.append('pcbUrl', this.state.pcbUrl);
    formData.append('faceplateUrl', this.state.faceplateUrl);

    console.log(formData.get('kitName'));

    API.addKit(formData)
      .then(res => this.loadKits())
      .catch(err => console.log(err));
  };

  onChangeFile = event => {
    this.setState({ file: event.target.files[0] });
    console.log('test');
    console.log(this.state.file);

    // Grab the file DOM object and pass to papaparse
    // header: true creates an object for each row where keys = first row of csv
    Papa.parse(event.target.files[0], {
      header: true,
      complete: function (results) {
        // Store parsed data in global variable
        parsedBOM = results.data.splice(1, results.data.length - 1);
      }
    })
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
              <Input
                value={this.state.designer}
                onChange={this.handleInputChange}
                name="designer"
                placeholder="Designer Name"
              />
              <Input
                value={this.state.kitUrl}
                onChange={this.handleInputChange}
                name="kitUrl"
                placeholder="Kit Url"
              />
              <Input
                value={this.state.pcbUrl}
                onChange={this.handleInputChange}
                name="pcbUrl"
                placeholder="PCB Url"
              />
              <Input
                value={this.state.faceplateUrl}
                onChange={this.handleInputChange}
                name="faceplateUrl"
                placeholder="Faceplate Url"
              />
              <label>
                Upload BOM:
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeFile}
                />
              </label>
              <br />
              <label>
                Upload Kit Image:
                <input
                  type="file"
                  name="imgFile"
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
            <Row />


          </Col>
          <Col size="md-6 sm-12">
            <h3>My Kits</h3>
            {this.state.MyKits.length ? (
              <List>
                {this.state.MyKits.map((kit, index) => (
                  <ListItem key={index}>
                    <Link to={"/createkit/" + kit._id}>
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
