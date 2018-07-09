import React, { Component } from 'react';
import { Col, Navbar } from 'react-bootstrap';

class DefaultHeader extends Component {
  render() {
    return (
      <Navbar className="header-bg">
        <Col xs={12} md={5}>
        
        </Col>
        <Col xs={12} md={2}>
          <Navbar.Brand>
            <img src={require('../../assets/img/logo.png')} alt="Bionexo" />
          </Navbar.Brand>
        </Col>
        <Col xs={12} md={5}>
        
        </Col>
      </Navbar>
    );
  }
}

export default DefaultHeader;