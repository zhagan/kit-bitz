import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';

class Detail extends Component {
  state = {
    part: {

      _id:'',
      item:{
        imagesets:[{
          small_image:{
            url:'',
          },
          medium_image:{
            url:'',
          }
        }],
      },
      snippet:''
    }
  };
  // When this component mounts, grab the part with the _id of this.props.match.params.id
  // e.g. localhost:3000/parts/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getPart(this.props.match.params.id)
      .then(res => {
        this.setState({ part: res.data});
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>

              <h1>
                {this.state.part.item.imagesets[0].medium_image &&
                  <img src={this.state.part.item.imagesets[0].medium_image.url} alt=""></img>
                }
                {this.state.part.item.mpn}
              </h1>

            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Item</h1>
              <p>
                {this.state.part.snippet}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/parts">← Back to Parts</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
