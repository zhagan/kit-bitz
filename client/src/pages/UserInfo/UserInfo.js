import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

import API from "../../utils/API";
import './UserInfo.css';



class UserInfo extends Component {
  state = {
    userInfo: {},
    edit: false
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

    // this.loadInventory();
  }

  importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  setEdit = () => {
    if (!this.state.edit) {
      this.setState({ edit: true });
    } else {
      this.setState({ edit: false });
    }
  }

  render() {
    console.log("test");
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
