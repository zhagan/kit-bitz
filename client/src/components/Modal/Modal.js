import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from "axios";
import {update} from "../../services/withUser";
import { withRouter, Redirect } from "react-router-dom";



// gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 50
}

const footerStyle = {
    position: "absolute",
    bottom: 20,
};

const imageStyle = {
    maxHeight: 400

};

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        this.state = {

            username: "",
            password:"",
            newUserName:"",
            newPassword:"",
            email:"",
            loginFailed: false

          };

          this.initState = {

            username: "",
            password:"",
            newUserName:"",
            newPassword:"",
            email:"",
            loginFailed: false

          };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
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

    onClose = (e) => {
        console.log("BUTTON CLICKED");
        e.stopPropagation ();
        this.props.onClose && this.props.onClose(e);
    }

    onKeyUp = (e) => {
        // Lookout for ESC key (27)
        if (e.which === 27 && this.props.show) {
            this.onClose(e);
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
        modalRoot.removeChild(this.el);
    }

    render() {
        var modalUI = (
            <div style={backdropStyle}>
                <div className="modal-box">

                        <button type="button" className="close" aria-label="Close" onClick={(e) => { this.onClose(e)}}><span aria-hidden="true">&times;</span></button>

                        <div className="col-md-12">
                            {this.props.children}
                        </div>

                        <h3><i className="fas fa-user-circle"></i>&nbsp;Create New Account</h3>
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

                </div>

        );
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal (
            modalUI,
            this.el,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}
