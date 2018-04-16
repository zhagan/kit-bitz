import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, CenterContainer } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Modal from '../../components/Modal/Modal';
import './Login.css';
import Axios from "axios";
import {update} from '../../services/withUser';
import { withRouter, Redirect } from 'react-router-dom';



class Login extends Component {
  state = {
    show: false,
    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:"",
    loginFailed: false,
  

  };

  initState = {
    show: false,
    username: "",
    password:"",
    newUserName:"",
    newPassword:"",
    email:"",
    loginFailed: false

  };

  showModal = () => {
    // this.setState({
    //   ...this.state,
    //   show: !this.state.show
    // });
    this.setState((prevState) => ({
      show: !prevState.show
    }));
    
  }


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


  render() {
    return (
      <div>
      <CenterContainer fluid>
        <div className="form-box">
        <Row>
          
        <div className="col-md-12">
        <div className="col-md-7" id="registerBox">
            
            <h4><span className="pop"><i className="fas fa-user-circle"></i>&nbsp;New User?</span> Create an account.</h4>
            <button className="btn btn-info" type="button" id="inputBtn"
            onClick={this.showModal}
            value="Register">Register&nbsp;<i className="fas fa-angle-double-right"></i></button>
            
            
            </div>
        </div>
    
        </Row>

        <Row>
        <div className="col-md-12">
          <h3><i className="fas fa-sign-in-alt"></i>&nbsp;Login to Kit-Bitz</h3>

            <form>
              {this.state.loginFailed ? <p style={{color: 'red'}}>Login Failed</p> : null }
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
            </div>
        </Row>



        
        </div>
      </CenterContainer>
      <Modal onClose={this.showModal} show={this.state.show}>
      
      </Modal>
      </div>
    );
  }
}

export default withRouter(Login);
