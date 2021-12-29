const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const categories = require('./app/categories');
const ads = require('./app/ads');
const users = require('./app/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8003;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/categories', categories);
  app.use('/users', users);
  app.use('/ads', ads);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});