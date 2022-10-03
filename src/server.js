'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const authRoutes = require('./auth/auth-routes');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(logger);
app.use(authRoutes);
app.use(routes);
app.use('*', notFound);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => console.log('Server up and running on port:', PORT));
}

module.exports = { app, start };
