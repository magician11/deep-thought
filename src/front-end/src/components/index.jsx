import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Button, Alert } from 'react-bootstrap';
import ReactSwipe from 'react-swipe';

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

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    const numberOfQuestions = 8;

    fetch(`https://golightlyplus.com:6900/questions?num=${numberOfQuestions}`)
    .then(response => response.json())
    .then((questions) => {
      this.setState({ questions, appReady: true });
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
        continuous: false,
      };

      content = (
        <ReactSwipe className="questions" swipeOptions={{...settings}}>
          { this.state.questions.map((question, i) => <div key={i} className='question'><Grid>{question}</Grid></div>) }
          <div key='final-slide' className='question'><Grid>
            <h2>All done!</h2>
            <p>To play again, just refresh the page.</p>
            <h4>To give any feedback or to get in touch, <a href="https://www.golightlyplus.com/contact">contact us</a>.</h4>
          </Grid></div>
        </ReactSwipe>
      );
    }

    return (
      <Grid>
        { content }
      </Grid>
    );
  }
}

export default DeepThoughtApp;
