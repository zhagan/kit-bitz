import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    kit: {
      kitName: "",
      bom: null,
      designer: "",
      kitUrl: "",
      pcbUrl: "",
      faceplateUrl: "",
      createdBy:""
    }
  };
  // When this component mounts, grab the part with the _id of this.props.match.params.id
  // e.g. localhost:3000/parts/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getKit(this.props.match.params.id)
      .then(res => {
        this.setState({ kit: res.data});
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  compareInventory() {
    // get inventory
    console.log(this.state.kit.bom);
  }

  render() {
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>
                {this.state.kit.kitName} created by {this.state.kit.createdBy.username}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <p>
            This Kit is Designed By {this.state.kit.designer}<br/>
            <a href={this.state.kit.kitUrl} target="_blank">Kit Link</a><br/>
            <a href={this.state.kit.pcbUrl} target="_blank">PCB Link</a><br/>
            <a href={this.state.kit.faceplateUrl} target="_blank">Faceplate Link</a>
              <br />
              <button
                onClick={this.compareInventory}
              > Compare to Inventory</button>  
            </p>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/createKit">← Back to Create Kit</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
