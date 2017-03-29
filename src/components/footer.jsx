import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import DeepThoughtModal from './modal';
import Author from './author';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} className="text-center">
            <Button onClick={() => { this.props.goHome(); }} bsStyle="link">
              <Glyphicon glyph="home" /> Home
            </Button>
            <Button onClick={() => this.setState({ showModal: true })} bsStyle="link">
              <Glyphicon glyph="info-sign" /> About
            </Button>
            <Author />
          </Col>
        </Row>
        <DeepThoughtModal
          showModal={this.state.showModal}
          onModalClosed={() => this.setState({ showModal: false })}
        />
      </Grid>
    );
  }
}

Footer.propTypes = {
  goHome: React.PropTypes.func.isRequired,
};

export default Footer;
