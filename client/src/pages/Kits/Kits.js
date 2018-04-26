import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container, CenterContainer } from "../../components/Grid";

import KitCard from "../../components/KitCard";
import SideNav from "../../components/SideNav";
import API from "../../utils/API";
import { ListCard, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import './Kits.css';


class Kits extends Component {
  state = {
    kits:[],

  };
  // When this component mounts, grab the part with the _id of this.props.match.params.id
  // e.g. localhost:3000/parts/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getKits()
      .then(res => {
        this.setState({ kits: res.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));

    // this.loadInventory();
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
      INVarray.push(element.item.mpn);
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

  importAll = (r) => {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }


  render() {
    return (
      <Container fluid>
      <Col size="md-2">
       <SideNav />
      </Col>
      <Col size="md-10">

        <div className="card-list-container">
            {this.state.kits.length ? (
              <ListCard>
                {this.state.kits.map((kit, index) => (
                <KitCard kit={kit} />
                ))}
              </ListCard>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </div>


        </Col>

        <Row>
        </Row>


       </Container>

    );
  }
}

export default Kits;
