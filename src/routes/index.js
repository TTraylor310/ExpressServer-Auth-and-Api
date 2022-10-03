'use strict';

const express = require('express');
const dataModules = require('../models/index');
const permission = require('../auth/middleware/acl');
const bearerAuth = require('../auth/middleware/bearer');
const {
  handleGetOne,
  handleGetAll,
  handleCreate,
  handleUpdate,
  handleDelete,
} = require('./handlers');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.post('/:model', bearerAuth, permission('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permission('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permission('delete'), handleDelete);

module.exports = router;
