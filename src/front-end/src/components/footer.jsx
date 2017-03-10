import React, { Component } from 'react';
import { Modal, Glyphicon, Button } from 'react-bootstrap';

/* eslint-disable max-len */

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  render() {
    const buttonTitle = 'About / Contact / FAQ';
    return (
      <div>
        <Modal
          bsSize="large"
          aria-labelledby="about-modal"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title id="about-modal">{ buttonTitle }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>How do I use this?</h4>
            <p>There are no rules per se. Suggested use is in a group or 1-on-1 to take turns answering a question, and then move onto the next one. Allow the person speaking to talk without being interrupted. Be honest.</p>
            <h4>What if I don't want to answer a question?</h4>
            <p>This game is intended to facilitate depth and connection. If you feel unsafe for some reason in this group or with this question, then pass.</p>
            <p>Also remember the deepest connections are forged through being vulnerable. So take the risk sometimes in being really seen and heard.</p>
            <h4>Have a strong opinion about a question? Want to suggest a new one?</h4>
            <p>Great! All the current questions have been vetted by multiple people. The questions are intended to deepen connection, while avoiding diving into negativity. Of course everyone will have a subjective view of a question, and could be potentially triggered by any question. We do our best, and welcome any feedback.</p>
            <p>To get in touch, see below.</p>
            <h4>Want to get in touch?</h4>
            <p>Email Andrew at <a href="mailto:support@andrewgolightly.com">support@andrewgolightly.com</a></p>
            <br />
            <p>Thank you for taking the time to connect deeply with others!</p>
            <p>Andrew</p>
            <p><Glyphicon glyph="heart" /> </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className="text-center footer">
          <Button onClick={() => this.setState({ showModal: true })}>
            <Glyphicon glyph="info-sign" /> { buttonTitle }
          </Button>
        </div>
      </div>
      );
    }
  }

  export default Footer;
