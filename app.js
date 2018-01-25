/*
mlab:
*/

'use strict';

// [START app]
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const f = require('util').format;
const routes = require('./routes/routes');


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://obriant:password@ds135537.mlab.com:35537/dev-db")
  .then(() => {
    app.get('/connect', (req, res) => {
      res.send('connected');
    });
  })
  .catch((err) => console.log(err));


app.use(bodyParser.json());

routes(app);


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
// [END app]
