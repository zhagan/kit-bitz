import React, { Component } from 'react';
import { Col, Row } from '../../components/Grid';

import KitCard from '../../components/KitCard';
import SideNav from '../../components/SideNav';
import API from '../../utils/API';
import { ListCard } from '../../components/List';
import './Kits.css';
import '../../components/KitCard/KitCard';


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
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


  render() {
    return (
      <Row>
        <Col size="md-3">
          { this.props.user ?(
            <SideNav />
          ) : (<div></div>) }
        </Col>
        <Col size="md-9">

          <div className="card-list-container">
            {this.state.kits.length ? (
              <ListCard>
                {this.state.kits.map((kit) => (
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
