import React, { Component } from 'react';
import { Grid, Button, Glyphicon } from 'react-bootstrap';

import DeepThoughtModal from './modal';
import Author from './author';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <Grid className="home-screen">
        <h1 className="text-center">Welcome to Deep Thought<br />
          <small>The app that forges deep connections</small>
        </h1>
        <h2>How to Play</h2>
        <ol>
          <li>Get together with at least 1 other person you really want to get to know more.</li>
          <li>Choose a game style below.</li>
          <li>Swipe through the questions and take turns in answering them outloud.</li>
        </ol>
        <p className="text-center">Choose a game style</p>
        <Button block bsStyle="primary" bsSize="large" onClick={() => this.props.gameChosen('A')}>8 Random Deep Questions</Button>
        <Button block bsStyle="primary" bsSize="large" onClick={() => this.props.gameChosen('B')}>The 36 Questions That Lead to Love</Button>
        <div className="text-center">
          <Button onClick={() => this.setState({ showModal: true })} bsStyle="link" bsSize="large">
            <Glyphicon glyph="info-sign" /> About
          </Button>
          <Author />
        </div>
        <audio src="https://www.dropbox.com/s/r0z11xxh7xwjzfi/strange%20piano%20with%20beats.mp3?raw=1" autoPlay loop />
        <DeepThoughtModal
          showModal={this.state.showModal}
          onModalClosed={() => this.setState({ showModal: false })}
        />
      </Grid>
    );
  }
}

Home.propTypes = {
  gameChosen: React.PropTypes.func.isRequired,
};

export default Home;
