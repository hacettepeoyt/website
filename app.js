require('dotenv').config();
const express = require('express');
require('./express-async-errors');
const connectToMongo = require('./database/connection');
const mainRoute = require('./routes/main');
const path = require('path');

const app = express();

const port = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', mainRoute);
app.set('view engine', 'ejs');

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on ${port}`);
    connectToMongo();
  }
});

module.exports = app;
