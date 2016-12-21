import React, { Component } from 'react';
import 'whatwg-fetch';

import styling from '../styling/main.scss';

class DeepQuestionsApp extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      currentQuestion: '',
    };

    this.changeQuestion = this.changeQuestion.bind(this);
  }

  componentDidMount() {
    fetch('http://golightlyplus.com:6900/questions?num=3')
    .then(response => response.json())
    .then((questions) => {
      this.setState({ questions, currentQuestion: questions[0] });
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

  render() {
    let content;
    if (this.state.questions.length === 0) {
      content = 'Game over';
    } else {
      content = this.state.currentQuestion;
    }
    return (
      <div className={styling['deep-questions-app']} onClick={this.changeQuestion}>
        {content}
      </div>
    );
  }
}

export default DeepQuestionsApp;
