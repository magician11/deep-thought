import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button } from 'react-bootstrap';
import ReactSwipe from 'react-swipe';

import 'bootstrap/dist/css/bootstrap.css';
import styling from '../styling/main.scss';

class DeepQuestionsApp extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      appReady: false,
      started: false,
    };

    this.changeQuestion = this.changeQuestion.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    fetch('http://golightlyplus.com:6900/questions?num=8')
    .then(response => response.json())
    .then((questions) => {
      this.setState({ questions, appReady: true });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  changeQuestion() {
    const allQuestions = this.state.questions;
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const randomQ = allQuestions[randomIndex];
    allQuestions.splice(randomIndex, 1);
    this.setState({
      questions: allQuestions,
      currentQuestion: randomQ,
    });
  }

  startGame() {
    this.setState({ started: true });
  }

  render() {
    let content;

    if (!('ontouchstart' in window)) {
      content = <h2>Sorry, this app currently only works with touch screens.</h2>;
    } else if (!this.state.appReady) {
      content = <div className={styling.spinner} />;
    } else if (!this.state.started) {
      content = (
        <div className={styling['home-screen']}>
          <h1>Deep Thought</h1>
          <p>8 Questions To Deepen Connection</p>
          <Button block bsStyle="primary" bsSize="large" onClick={this.startGame}>Begin</Button>
        </div>
      );
    } else {
      content = (
        <ReactSwipe swipeOptions={{ continuous: false }}>
          { this.state.questions.map((question, i) => <div key={i} className={styling.question}>{question}</div>) }
        </ReactSwipe>
      );
    }

    return (
      <div className={styling['deep-questions-app']}>
        { content }
      </div>
    );
  }
}

export default DeepQuestionsApp;
