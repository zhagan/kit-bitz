import React from "react";
import { Col, Row, Container, CenterContainer } from "../../components/Grid";
import './Hero.css';
import image from './bugsSide.png';

const Hero = ({ children }) => (
  <div className="hero">
    <Row id="row">
        <Col size="md-4">
        {children}
        </Col>
        <Col id="imageCol" size="md-8">
        <img src={image} id="bugsImage" />
        </Col>
    </Row>

    
  </div>
);

export default Hero;
