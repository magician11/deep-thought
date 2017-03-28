import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import DeepThoughtModal from './modal';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <Grid className="footer">
        <Row>
          <Col xs={6}>
            <Button onClick={() => { window.location = '/'; }} bsStyle="link">
              <Glyphicon glyph="home" /> Home
            </Button>
          </Col>
          <Col xs={6} className="text-right">
            <Button onClick={() => this.setState({ showModal: true })} bsStyle="link">
              <Glyphicon glyph="info-sign" /> About
            </Button>
          </Col>
        </Row>
        <DeepThoughtModal showModal={this.state.showModal} onModalClosed={() => this.setState({ showModal: false })} />
      </Grid>
  );
}
}

export default Footer;