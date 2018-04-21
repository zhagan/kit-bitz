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
      createdBy: "",
    },
    inventory: "",
    matchedPart: [],
    unmatchedPart: ""
  };
  // When this component mounts, grab the part with the _id of this.props.match.params.id
  // e.g. localhost:3000/parts/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getKit(this.props.match.params.id)
      .then(res => {
        this.setState({ kit: res.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));

    this.loadInventory();
  }

  loadInventory = () => {
    API.getParts()
      .then(res =>
        this.setState({ inventory: res.data })
      )
      .catch(err => console.log(err));
  };

  compareInventory = () => {

    // set empty arrays
    let BOMarray = [];
    let INVarray = [];
    let matchedArray = [];
    let unmatchedArray = [];

    // store BOM MPN's in array
    this.state.kit.bom.forEach(element => {
      BOMarray.push(element.MPN);
    });

    // store inventory MPN's in array
    this.state.inventory.forEach(element => {
      INVarray.push(element.MPN);
    });

    // if MPN in both inventory and BOM push to matchedArray
    BOMarray.forEach((BOMelement, index) => {
      if (INVarray.includes(BOMelement)) {
        matchedArray.push(BOMelement);
      } else {
        unmatchedArray.push(BOMelement);
      }
    });
    
    this.setState({ matchedPart: matchedArray, unmatchedPart: unmatchedArray }, () => {
      console.log("State: " + this.state.matchedPart);
      console.log("State: " + this.state.unmatchedPart);
    });
  }


  render() {
    return (

      <Container fluid>
        
          <div className="kit-card">
            <div className="kit-image-container">
              <img src="boards/github.com/8BitMixtape/8BitmixtapeNEO_BerlinerSchule_SZ-RDY/images/top.png" class="img" style="transition: opacity 1s; opacity: 1;" />
            </div>
            <div className="kit-title">
             {this.state.kit.kitName}
            </div>
            <div className="kit-owner">
              <p>
              Created by {this.state.kit.createdBy.username}
              </p>
            </div>
            <div className="kit-designer">
              <p>
              This Kit is Designed By {this.state.kit.designer}<br />
              <a href={this.state.kit.kitUrl} target="_blank">Kit Link</a><br />
              <a href={this.state.kit.pcbUrl} target="_blank">PCB Link</a><br />
              <a href={this.state.kit.faceplateUrl} target="_blank">Faceplate Link</a>
              <br />
              <button
                onClick={this.compareInventory}
              > Compare to Inventory</button>
              </p>
            </div>
            
            <div className="kit-summary">
            <p>The key feature of the new 8Bit Mixtape is the easiness of uploading new codes using an audio communication protocol, means just playing a .wav sound file from your computer/smart phone (or walkman). A specific bootloader (TinyAudioBoot) has to be installed on the chip to be able to do so.</p>
            </div>
          </div>


        
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
