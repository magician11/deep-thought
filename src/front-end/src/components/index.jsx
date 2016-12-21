import React, { Component } from 'react';
import 'whatwg-fetch';

import styling from '../styling/main.scss';

class DeepQuestionsApp extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    fetch('http://golightlyplus.com:6900/questions?num=9')
    .then(response => response.json())
    .then((questions) => {
      console.log(questions);
      this.setState({ questions });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render() {
    const question = this.state.questions[0];

    return (
      <div className={styling['deep-questions-app']}>
        {question}
      </div>
    );
  }
}

export default DeepQuestionsApp;
