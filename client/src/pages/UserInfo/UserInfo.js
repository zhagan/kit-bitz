import React, { Component } from 'react';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import API from '../../utils/API';
import './UserInfo.css';



class UserInfo extends Component {
  state = {
    userInfo: {},
    edit: false,
    newUsername: '',
    newEmail: '',
    imgFile: {},
  };
  // When this component mounts, grab the part with the _id of this.props.match.params.id
  // e.g. localhost:3000/parts/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getUser()
      .then(res => {
        this.setState({ userInfo: res.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  setEdit = () => {
    if (!this.state.edit) {
      this.setState({ edit: true });
    } else {
      this.setState({ edit: false });
    }
  }

  handleInputChange = event => {
    
    let value = event.target.value;
    const name = event.target.name;

    console.log(name + ': ' + value);

    this.setState({
      [name]: value
    });
  };

  onChangeImgFile = event => {
    this.setState({ imgFile: event.target.files[0] });
  }

  handleFormSubmit = event => {

    event.preventDefault();

    const formData = new FormData();

    formData.append('username', this.state.newUsername);
    formData.append('email', this.state.newEmail);
    formData.append('file', this.state.imgFile);

    console.log(this.state);
  };

  render() {
    console.log('test');
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>
              Account info
            </h1>
            <button onClick={this.setEdit}>edit</button>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">

            {!this.state.edit ? (
              <div>
                <p>
                  Username: {this.state.userInfo.username}
                  <br />
                  Email: {this.state.userInfo.email}
                </p>
              </div>
            ) : (
              <div>
                <h3>edit on</h3>
                <form>
                  <Input
                    defaultValue={this.state.userInfo.username}
                    onChange={this.handleInputChange}
                    name="newUsername"
                  />
                  <Input
                    defaultValue={this.state.userInfo.email}
                    onChange={this.handleInputChange}
                    name="newEmail"
                  />
                  <label>
                      Upload Profile Picture:
                    <input
                      type="file"
                      name="imgFile"
                      onChange={this.onChangeImgFile}
                    />
                  </label>
                  <FormBtn onClick={this.handleFormSubmit}>
                      Save changes
                  </FormBtn>
                </form>
                <p>
                    Username: {this.state.userInfo.username}
                  <br />
                    Email: {this.state.userInfo.email}
                </p>
              </div>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserInfo;
