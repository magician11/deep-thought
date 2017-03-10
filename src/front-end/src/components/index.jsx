import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Button, Alert } from 'react-bootstrap';
import Swiper from 'react-id-swiper'; // https://github.com/kidjp85/react-id-swiper
import sampleSize from 'lodash.samplesize';
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga
import Sound from 'react-sound';

import Footer from './footer';

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
      error: '',
    };

    // Add Google Analytics
    ReactGA.initialize('UA-63340534-4');
    ReactGA.pageview(window.location.pathname);

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    // grab all the questions direct from the spreadsheet feed
    fetch('https://spreadsheets.google.com/feeds/cells/1lxo1qiy9aTm49kk_fyZ543IbxhSfYSgboXKBX1yz160/1/public/basic?alt=json')
    .then(response => response.json())
    .then((data) => {
      const allQuestions = [];
      data.feed.entry.forEach((cell) => {
        const cellPosition = cell.title.$t.match(/(\w)(\d+)/);
        if(cellPosition[1] === 'A' && parseInt(cellPosition[2], 10) > 1) {
          allQuestions.push(cell.content.$t);
        }
      });
      this.setState({ questions: sampleSize(allQuestions, 8), appReady: true });
    }).catch((ex) => {
      this.setState({error: ex.message});
    });
  }

  startGame() {
    this.setState({ started: true });
  }

  render() {
    let content;

    if (this.state.error !== '') {
      content = (
        <div className="error-message">
          <Alert bsStyle="danger">
            <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Error: {this.state.error}</p>
            <p>Please <a href="https://www.golightlyplus.com">contact Andrew</a></p>
          </Alert>
        </div>
      );
    } else if (!this.state.appReady) {
      content = <div className="center-center"><div className='spinner' /></div>;
    } else if (!this.state.started) {
      content = (
        <div className="center-center">
          <div className="home-screen text-center">
            <YinYang className="logo" />
            <h1>Deep Thought</h1>
            <p>Questions To Deepen Connection</p>
            <Button block bsStyle="primary" bsSize="large" onClick={this.startGame}>8 Deep Questions</Button>
            <Sound
              url='https://www.dropbox.com/s/3186zxvhg4nex7k/J%20Dilla%20-%20Life%20%28Instrumental%29.mp3?raw=1'
              playStatus={Sound.status.PLAYING}
            />
          </div>
        </div>
      );
    } else {

      const params = {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        containerClass: 'questions',
        spaceBetween: 88,
        effect: 'flip',
        grabCursor: true
      };

      content = (
        <div className="question-screen">
          <Swiper {...params}>
            { this.state.questions.map((question, i) => <div key={i} className='question'><Grid>{question}</Grid></div>) }
            <div key='final-slide' className='question'>
              <Grid>
                <h2><i className="fa fa-hand-peace-o" aria-hidden="true"></i></h2>
                <h3>Thanks for playing!</h3>
                <Button href="/">Start Over</Button>
              </Grid>
            </div>
          </Swiper>
          <Footer />
        </div>
      );
    }

    return (
      <div className="app-container">
        { content }
      </div>
    );
  }
}

export default DeepThoughtApp;
