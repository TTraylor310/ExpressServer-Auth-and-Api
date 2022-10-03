'use strict';

const handleGetAll = async (req, res, next) => {
  try {
    const allRecords = await req.model.read();
    res.status(200).json(allRecords);
  } catch (e) {
    console.error('Error in handleGetAll:', e.message);
    next(e);
  }
};

const handleGetOne = async (req, res, next) => {
  try {
    const record = await req.model.read(req.params.id);
    res.status(200).json(record);
  } catch (e) {
    console.error('Error in handleGetOne:', e.message);
    next(e);
  }
};

const handleCreate = async (req, res, next) => {
  try {
    const newRecord = await req.model.create(req.body);
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('Error in handleCreate:', e.message);
    next(e);
  }
};

const handleUpdate = async (req, res, next) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    const updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error('Error in handleUpdate:', e.message);
    next(e);
  }
};

const handleDelete = async (req, res, next) => {
  try {
    const deletedRecord = await req.model.delete(req.params.id);
    res.status(200).json(deletedRecord);
  } catch (e) {
    console.error('Error in handleDelete:', e.message);
    next(e);
  }
};

module.exports = {
  handleGetAll,
  handleGetOne,
  handleCreate,
  handleUpdate,
  handleDelete,
};
