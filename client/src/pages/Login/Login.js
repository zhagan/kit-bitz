import React, { Component } from 'react';
import { Row, CenterContainer } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import Modal from '../../components/Modal/Modal';
import './Login.css';
import Axios from 'axios';
import {update} from '../../services/withUser';
import { withRouter } from 'react-router-dom';
import loginpic from './login-page.png';
import kitbitzname from './Kit-Bitz-name.png';




class Login extends Component {
  state = {
    show: false,
    username: '',
    password:'',
    newUserName:'',
    newPassword:'',
    email:'',
    loginFailed: false,


  };

  initState = {
    show: false,
    username: '',
    password:'',
    newUserName:'',
    newPassword:'',
    email:'',
    loginFailed: false

  };

  showModal = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  }

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
        <CenterContainer>
          <div className="form-box">
            <img
              src={loginpic}
              alt="Kit-Bitz"
              className="loginpic"
            />
            <Row>
              <div className="col-md-12 login-info-box">

                <h3>Welcome to</h3>
                <img
                  src={kitbitzname}
                  alt="Kit-Bitz"
                  className="kitbitzname"
                />

                <form>
                  {this.state.loginFailed ? <p style={{color: 'red'}}>Login Failed</p> : null }
                  <Input
                    className = "input"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="User Name (required)"
                  />
                  <Input
                    className = "input"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="Password (required)"
                  />
                  <div className="button-section">
                    <FormBtn 
                      disabled={!(this.state.username && this.state.password)}
                      onClick={this.handleFormSubmit}
                    >Login</FormBtn>

                    

                    <button className="btn btn-info form-btn" type="button" id="inputBtn"
                      onClick={this.showModal}
                      value="Register">Or Register&nbsp;<i className="fas fa-angle-double-right"></i></button>
                  </div>
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
