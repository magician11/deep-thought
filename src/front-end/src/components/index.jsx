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
    .then((json) => {
      console.log('parsed json', json);
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render() {
    const content = <h1>Your React app starting point</h1>;

    return (
      <div className={styling['your-component']}>
        {content}
      </div>
    );
  }
}

export default DeepQuestionsApp;
