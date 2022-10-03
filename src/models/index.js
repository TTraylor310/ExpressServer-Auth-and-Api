'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const moviesModel = require('./movies.js');
const musicModel = require('./music.js');
const userModel = require('../auth/models/users.js');
const modelInterface = require('./model-interface.js');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  typeValidation: true,
} : {
  typeValidation: true,
};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const movies = moviesModel(sequelize, DataTypes);
const music = musicModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

// music.belongsTo(movies);

// music.hasMany(movies, {foreignKey: 'year'});
// movies.belongsTo(music, {foreignKey: 'year'});
// movies.find({where: {...}, include: [music]});
// movies.findAll({where: {...}, include: [music]});

module.exports = {
  db: sequelize,
  movies: new modelInterface(movies),
  music: new modelInterface(music),
  users,
};
