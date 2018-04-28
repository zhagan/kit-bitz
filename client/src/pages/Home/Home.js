import React, { Component } from 'react';
import './Home.css';
// import KitCard from './components/kit-card';

class Home extends Component {
  constructor(props) {
    super(props);

    // kits will be array of kit objects
    // 
    this.state = {
      kits: []
    };
  }

  render() {
    return (
      <div>
        {/* {this.state.kits.map( kit => <KitCard kit={kit}/> )} */}
      </div>
    );
  }
}

export default Home;