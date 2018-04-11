import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from "axios";
import {update} from '../../services/withUser';

import { withRouter } from 'react-router-dom';


class Login extends Component {
  state = {

    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:""

  };

  initState = {

    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:""

  };

  componentDidMount() {
  //  this.loadInventory();
  }

  // loadInventory = () => {
  //   API.getParts()
  //     .then( res =>
  //        this.setState({ inventory: res.data})
  //     )
  //     .catch(err => console.log(err));
  // };
  loadLogin = () => {
    // API.searchPart()
    //   .then(//res =>
    //     // this.setState({ Login: res.data, mfrNum: "", keyword: ""})
    //   )
    //   .catch(err => console.log(err));
  };

  // deletePart = id => {
  //   API.deletePart(id)
  //     .then(res => this.loadInventory())
  //     .catch(err => console.log(err));
  // };

  // addPart = part => {
  //   API.addPart(part)
  //     .then(res => this.loadInventory())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {

      Axios.post('/api/auth', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }).then(user => {
        // successful login
        update(user.data);
        this.props.history.push('/parts');
        console.log(user);
      }).catch(err =>{
          this.setState(this.initState);
         //return login account failed

      });
        // do something for login

    }
  };

  handleFormSubmitNewUser = event => {
    event.preventDefault();
    if (this.state.newUserName && this.state.newPassword && this.state.email) {
        // do something for create
        Axios.post('/api/users', {
          username: this.state.newUserName,
          password: this.state.newPassword,
          email: this.state.email
        }).then(user => {
        //  update(user.data);
          console.log(user);
        }).catch(err =>{

           //return create account failed

        });

    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

              <h3>Login to Kit-Bitz</h3>

            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="User Name (required)"
              />
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <FormBtn
                disabled={!(this.state.username && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Login
              </FormBtn>
            </form>
            <Row/>
          </Col>
          <Col size="md-6 sm-12">
              <h3>Create new Account</h3>
              <form>
                <Input
                  value={this.state.newUserName}
                  onChange={this.handleInputChange}
                  name="newUserName"
                  placeholder="User Name (required)"
                />
                <Input
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.handleInputChange}
                  name="newPassword"
                  placeholder="Password (required)"
                />
                <Input
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Email (required)"
                />
                <FormBtn
                  disabled={!(this.state.newUserName && this.state.newPassword)}
                  onClick={this.handleFormSubmitNewUser}
                >
                  Create Account
                </FormBtn>
              </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
