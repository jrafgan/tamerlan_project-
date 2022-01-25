const express = require('express');
require('dotenv').config()
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const categories = require('./app/categories');
const messages = require('./app/messages');
const ads = require('./app/ads');
const users = require('./app/users');

const port = process.env.PORT || 8003;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/categories', categories);
  app.use('/messages', messages);
  app.use('/users', users);
  app.use('/ads', ads);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});