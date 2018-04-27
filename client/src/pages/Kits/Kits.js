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

  importAll = (r) => {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }


  render() {
    return (
      <Row>
      <Col size="md-3">
       <SideNav />
      </Col>
      <Col size="md-9">

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


       </Row>

    );
  }
}

export default Kits;
