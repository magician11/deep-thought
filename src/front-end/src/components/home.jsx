import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import DeepThoughtModal from './modal';

import YinYang from '../svgs/yin-yang';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div className="center-center">
        <div className="home-screen text-center">
          <YinYang className="logo" />
          <h1>Deep Thought</h1>
          <p>Questions To Deepen Connection</p>
          <Button block bsStyle="primary" bsSize="large" onClick={() => this.props.gameChosen('A')}>8 Random Deep Questions</Button>
          <Button block bsStyle="primary" bsSize="large" onClick={() => this.props.gameChosen('B')}>The 36 Questions That Lead to Love</Button>
          <Button onClick={() => this.setState({ showModal: true })} bsStyle="link" bsSize="large">
            <Glyphicon glyph="info-sign" /> About
          </Button>
          <audio src="https://www.dropbox.com/s/r0z11xxh7xwjzfi/strange%20piano%20with%20beats.mp3?raw=1" autoPlay loop />
          <DeepThoughtModal showModal={this.state.showModal} onModalClosed={() => this.setState({showModal: false})}/>
        </div>
      </div>
    );
  }
}

export default Home;
