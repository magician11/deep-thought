/*
Taken from https://developers.google.com/sheets/api/quickstart/nodejs
*/

/* eslint-disable no-console */

const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const https = require('https');
const GoogleAuth = require('google-auth-library');
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE)}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}/deep-thoughts.json`;

function getQuestions(auth, res, numQs) {
  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: '1lxo1qiy9aTm49kk_fyZ543IbxhSfYSgboXKBX1yz160',
    range: 'A2:999',
  }, (err, response) => {
    if (err) {
      console.log(`The API returned an error: ${err}`);
      return;
    }
    const rows = response.values;
    if (rows.length === 0) {
      res.send('No data found.');
    } else {
      const allQuestions = rows.map(row => row[0]);

      const questionSample = [];

      function getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        const randomQ = allQuestions[randomIndex];
        allQuestions.splice(randomIndex, 1);
        return randomQ;
      }

      for (let i = 0; i < numQs; i += 1) {
        questionSample.push(getRandomQuestion());
      }
      res.json(questionSample);
    }
  });
}

/**
* Get and store new token after prompting for user authorization, and then
* execute the given callback with the authorized OAuth2 client.
*
* @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
* @param {getEventsCallback} callback The callback to call with the authorized
*     client.
*/
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
* Create an OAuth2 client with the given credentials, and then execute the
* given callback function.
*
* @param {Object} credentials The authorization client credentials.
* @param {function} callback The callback to call with the authorized client.
*/
function authorize(credentials, callback, res, numQs) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, res, numQs);
    }
  });
}

/**
* Store token to disk be used in later program executions.
*
* @param {Object} token The token to store to disk.
*/
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${TOKEN_PATH}`);
}

const app = express();
app.use(cors());

app.get('/questions', (req, res) => {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) {
      console.log(`Error loading client secret file: ${err}`);
      return;
    }
    if (!req.query.num) {
      res.send('Number of questions not specified. e.g. /questions?num=11');
    } else {
      authorize(JSON.parse(content), getQuestions, res, req.query.num);
    }
  });
});

app.set('port', 6900);

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/golightlyplus.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/golightlyplus.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/golightlyplus.com/chain.pem'),
};

// startup the https server
https.createServer(sslOptions, app).listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Deep questions webapp listening on port ${app.get('port')}.`);
});
