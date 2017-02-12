import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Button } from 'react-bootstrap';
const Slider = require('react-slick');

import YinYang from '../svgs/yin-yang';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/main.css';

/* eslint-disable max-len, no-console */

class DeepThoughtApp extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      appReady: false,
      started: false,
    };

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    const numberOfQuestions = 8;

    fetch(`https://golightlyplus.com:6900/questions?num=${numberOfQuestions}`)
    .then(response => response.json())
    .then((questions) => {
      this.setState({ questions, appReady: true });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  startGame() {
    this.setState({ started: true });
  }

  render() {
    let content;

    if (!this.state.appReady) {
      content = <div className="loader-container"><div className='spinner' /></div>;
    } else if (!this.state.started) {
      content = (
        <div className='home-screen'>
          <div>
            <YinYang className="logo" />
            <h1>Deep Thought</h1>
            <p>Questions To Deepen Connection</p>
            <Button block bsStyle="primary" bsSize="large" onClick={this.startGame}>Begin</Button>
          </div>
        </div>
      );
    } else {
      const settings = {
        className: 'questions',
        adaptiveHeight: true,
        arrows: false,
        infinite: false,
      };
      content = (
        <div className="slider-container">
          <Slider {...settings}>
            { this.state.questions.map((question, i) => <div key={i} className='question'><Grid>{question}</Grid></div>) }
            <div key='final-slide' className='question'><Grid>
              <h2>All done!</h2>
              <p>To play again, just refresh the page.</p>
              <h4>To give any feedback or to get in touch, <a href="https://www.golightlyplus.com/contact">contact Andrew</a>.</h4>
            </Grid></div>
          </Slider>
        </div>
      );
    }

    return (
      <Grid className='deep-questions-app'>
        { content }
      </Grid>
    );
  }
}

export default DeepThoughtApp;
