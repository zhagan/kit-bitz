import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, CenterContainer } from "../../components/Grid";
import { FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { Button } from 'react-bootstrap';
import './KitDetail.css';

import cardImage from '../../components/KitCard/kit-image-1.jpg';
import KitDetailTable from "./KitDetailTable/KitDetailTable";


class Detail extends Component {
  state = {
    kit: {
      kitName: "",
      bom: "",
      designer: "",
      kitUrl: "",
      pcbUrl: "",
      faceplateUrl: "",
      createdBy: "",
      kitImgPath: {
        path: "",
        name: "",
        originalname: ""
      }

    },
    inventory: "",
    bomComparisonArray: [],
    tableView: "noView",
    tableData: [],
    tableHeader: ""
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
        Qty: BOMitem.Qty - ((INVarray.find(INVitem => INVitem.MPN === BOMitem.MPN) || {}).Qty || 0) 
      };
    });

    this.setState({ bomComparisonArray: itemsNeedToFulfill }, () => {
      console.log(this.state.bomComparisonArray)
    })
  }

  tableView = () => {

    this.compareInventory();

    switch (this.state.tableView) {
      case "noView":
        this.setState({ tableData: [], tableHeader: "" });
        break;
      case "bomView":
        this.setState({ tableData: this.state.kit.bom, tableHeader: "Bill of Materials" });
        break; 
      case "compareView":
        this.setState({ tableData: this.state.bomComparisonArray, tableHeader: "Parts you need" });
        break;  
    }
  }

  toggleTable = () => {
    if (this.state.tableView === "noView") {
      this.setState({ tableView: "bomView" });
      console.log("bomView"); 
    }
    else if (this.state.tableView === "bomView") {
      this.setState({ tableView: "compareView" });
      console.log("compareView");  
    }
    else {
      this.setState({ tableView: "noView" });
      console.log("noView");
    }
    this.tableView();
  }

  importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


  render() {
    const images = this.importAll(require.context('../../../../uploads/kit-pics', false, /\.(png|jpe?g|svg)$/));
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
                    onClick={this.toggleTable}
                    > Toggle BOM
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
                
                <div id="bom-panel">
                  {this.state.tableData.length ? (
                    <div>
                      <h3>{this.state.tableHeader}</h3>
                      <div id='kitDetailTable'>
                        <div className="table-responsive">
                          <KitDetailTable
                            inventory={this.state.tableData}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                      <h3></h3>
                    )}
                </div>
              </div>
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
