import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Button, Alert } from 'react-bootstrap';
import Swiper from 'react-id-swiper'; // https://github.com/kidjp85/react-id-swiper
import sampleSize from 'lodash.samplesize';
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga

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
      loadingData: false,
      error: '',
      gameStarted: false,
    };

    // Add Google Analytics
    ReactGA.initialize('UA-63340534-4');
    ReactGA.pageview(window.location.pathname);

    this.startGame = this.startGame.bind(this);
  }

  startGame(gameType) {

    this.setState({loadingData: true});

    fetch('https://spreadsheets.google.com/feeds/cells/1lxo1qiy9aTm49kk_fyZ543IbxhSfYSgboXKBX1yz160/1/public/basic?alt=json')
    .then(response => response.json())
    .then((data) => {
      const allQuestions = [];
      data.feed.entry.forEach((cell) => {
        const cellPosition = cell.title.$t.match(/(\w)(\d+)/);
        if(cellPosition[1] === gameType && parseInt(cellPosition[2], 10) > 1) {
          allQuestions.push(cell.content.$t);
        }
      });

      let questions;
      switch (gameType) {
        // 8 random questions
        case 'A': questions = sampleSize(allQuestions, 8); break;
        // the 36 questions to fall in love in order
        case 'B': questions = allQuestions; break;
        default: questions = [];
      }

      this.setState({ questions, gameStarted: true, loadingData: false });

    }).catch((ex) => {
      this.setState({error: ex.message});
    });
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
    } else if (this.state.loadingData) {
      content = <div className="center-center"><div className='spinner' /></div>;
    } else if (this.state.gameStarted) {
      const params = {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        containerClass: 'questions',
        spaceBetween: 88,
        effect: 'flip',
        grabCursor: true
      };

      const questions = this.state.questions.map((question, i) => {
        return (
          <div key={i} className='question'>
            <Grid>
              <div>{question}</div>
            </Grid>
          </div>
        );
      });

      content = (
        <div className="question-screen">
          <Swiper {...params}>
            { questions }
          </Swiper>
          <Footer />
        </div>
      );
    } else { // just show the main page
      content = (
        <div className="center-center">
          <div className="home-screen text-center">
            <YinYang className="logo" />
            <h1>Deep Thought</h1>
            <p>Questions To Deepen Connection</p>
            <Button block bsStyle="primary" bsSize="large" onClick={() => this.startGame('A')}>8 Random Deep Questions</Button>
            <Button block bsStyle="primary" bsSize="large" onClick={() => this.startGame('B')}>The 36 Questions That Lead to Love</Button>
            <audio src="https://www.dropbox.com/s/r0z11xxh7xwjzfi/strange%20piano%20with%20beats.mp3?raw=1" autoPlay loop />
          </div>
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
