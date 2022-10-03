'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const permissions = require('./middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body signup:', req.body);
    const userRecord = await users.create(req.body);
    console.log('user signup:', userRecord);
    res.status(201).json(userRecord.user);
  } catch (e) {
    console.error('Error in /signup route:', e.message);
    res.status(403).send('There was an error creating the user');
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.error('Error in the /signin route');
    next(e);
  }
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const userRecords = await users.findAll();
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error('Error in /users route:', e.message);
    next(e);
  }
});

module.exports = authRouter;
