import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import { Col, Row, CenterContainer } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from "axios";
import {update} from '../../services/withUser';

import { withRouter, Redirect } from 'react-router-dom';


class Login extends Component {
  state = {

    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:"",
    loginFailed: false

  };

  initState = {

    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:"",
    loginFailed: false

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
        console.log(user);
        this.props.history.push('/parts');
      }).catch(err =>{
          this.setState(this.initState);
          this.setState({ loginFailed: true});
          console.log('login failed');
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
      <CenterContainer fluid>
        <Row>
        <Hero>
        <Link className="btn btn-default" type="button" to="/login">Login</Link>
        <div className="form-box">
        <h3>Create New Account</h3>
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

        </div>
        </Hero>
       </Row>
      </CenterContainer>
    );
  }
}

export default withRouter(Login);
