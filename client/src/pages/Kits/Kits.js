import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import './Kits.css';
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";


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


  render() {
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>
              Kits
            </h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">

            {this.state.kits.length ? (
              <List>
                {this.state.kits.map((kit, index) => (
                  <ListItem key={index}>
                    <Link to={"/createkit/" + kit._id}>
                      <strong>
                        {kit.kitName} created by {kit.createdBy.username}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}

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

export default Kits;
