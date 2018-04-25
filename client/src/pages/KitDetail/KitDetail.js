import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, CenterContainer } from "../../components/Grid";
import { FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { Button } from 'react-bootstrap';
import './KitDetail.css';
import cardImage from '../../components/KitCard/kit-image-1.jpg';

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
    bomComparisonArray: []
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

    // store BOM MPN's in array
    this.state.kit.bom.map(element => {
      let BOMobject = {
        MPN: element.MPN,
        Qty: element.Qty
      };
      BOMarray.push(BOMobject);
    });

    // store inventory MPN's in array
    this.state.inventory.map(element => {
      let INVobject = {
        MPN: element.MPN,
        Qty: element.Qty
      };
      INVarray.push(INVobject);
    });

    // return BOM with qtys user needs
    const itemsNeedToFulfill = BOMarray.map(BOMitem => {
      return {
        MPN: BOMitem.MPN,
        Qty: ((INVarray.find(INVitem => INVitem.MPN === BOMitem.MPN) || {}).Qty || 0) - BOMitem.Qty
      };
    });

    this.setState({ bomComparisonArray: itemsNeedToFulfill }, () => {
      console.log(this.state.bomComparisonArray)
    })
  }


  render() {
    return (
      <CenterContainer>

        <Row>
          <Col size="md-12">
            <div className="details-center">
              <div className="details-title">
                <h1>{this.state.kit.kitName} </h1>

                <h5>Created by <span id="pop-blue">{this.state.kit.createdBy.username}</span></h5>
              </div>

              <div className="details-image-container">
                <img
                  src={cardImage}
                  alt="Kit-Bitz"
                />
              </div>

              <div className="details-content">

                <h5>This Kit is designed by <span id="pop-blue">{this.state.kit.designer}</span></h5>
                <p>
                  <a href={this.state.kit.kitUrl} target="_blank">Kit Link</a><br />
                  <a href={this.state.kit.pcbUrl} target="_blank">PCB Link</a><br />
                  <a href={this.state.kit.faceplateUrl} target="_blank">Faceplate Link</a>
                  <br />
                </p>
                <h5>
                  <Button
                    onClick={this.compareInventory}
                  > Compare to Inventory
                  </Button>
                </h5>
              </div>
              <div className="details-summary">
                <p><small>A power switch using a push button. It turns on with a single press and only turns off when you hold the button down. This could be used to get functionality similar to most laptops where a single press when on will initiate a "soft" shutdown but you can force a "hard" shutdown by holding it down.

                The circuit is from this article.
                The board is my own design and features:
            </small></p>
                <ul><small>
                  <li>Standard 0.1" spacing, fits neatly onto a breadboard</li>
                  <li>On-board button (and pins to connect your own)</li>
                  <li>Can switch 3-20V and up to 4A</li>
                  <li>Two LEDs indicate input and output power</li>
                </small></ul>

              </div>
            </div>
            <h3>Parts I have in this kit</h3>
            {this.state.bomComparisonArray.length ? (
              <div id='comparisonTable'>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>MPN</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.bomComparisonArray.map(item => {
                          return (
                            <tr>
                              <td>{item.MPN}</td>
                              <td>{item.Qty}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>


        <Row>
          <Col size="md-4">
            <Link to="/createKit">← Back to Create Kit</Link>
          </Col>
        </Row>
      </CenterContainer>
    );
  }
}

export default Detail;
