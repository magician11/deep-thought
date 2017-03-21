import React from 'react';
import { Modal, Glyphicon, Button } from 'react-bootstrap';

const About = props =>
<Modal
  bsSize="large"
  aria-labelledby="about-modal"
  show={props.showModal}
  onHide={() => props.onModalClosed()}
>
  <Modal.Header closeButton>
    <Modal.Title id="about-modal">About</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h4>What is this?</h4>
    <p>This is an app that poses a variety of deep questions designed to deepen the connection with those you're playing this game with.</p>
    <h4>How do I use this?</h4>
    <p>There are no rules per se. Suggested use is in a group or 1-on-1 to take turns answering a question, and then move onto the next one. Allow the person speaking to talk without being interrupted. Be honest.</p>
    <h4>What if I don't want to answer a question?</h4>
    <p>This game is intended to facilitate depth and connection. If you feel unsafe for some reason in this group or with this question, then pass.</p>
    <p>Also remember the deepest connections are forged through being vulnerable. So take the risk sometimes in being really seen and heard.</p>
    <h4>I want to suggest a new question.</h4>
    <p>Great! <a href="https://goo.gl/forms/49quAbBREX7IzTuy2">Click here to fill out our form</a>.</p>
    <h4>Want to get in touch?</h4>
    <p>Email Andrew at <a href="mailto:support@andrewgolightly.com">support@andrewgolightly.com</a></p>
    <br />
    <p>Thank you for taking the time to connect deeply with others!</p>
    <p>Andrew</p>
    <p><Glyphicon glyph="heart" /> </p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={() => props.onModalClosed()}>Close</Button>
  </Modal.Footer>
</Modal>

  export default About;
