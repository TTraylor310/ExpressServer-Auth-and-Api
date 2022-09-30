'use strict';

const express = require ('express');
const cors = require('cors');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());
// app.use = (express.json());
// app.use(express.urlencoded({ extended: true}));
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('Working at Root for BT-SERVER');
});





app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  start: () => app.listen(PORT, () => console.log('listening on port ', PORT)),
  
};
