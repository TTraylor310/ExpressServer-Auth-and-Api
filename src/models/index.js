'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const moviesModel = require('./movies.js');
const musicModel = require('./music.js');
const userModel = require('../auth/models/users.js');
const modelInterface = require('./model-interface.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  typeValidation: true,
} : {
  logging: true,
  typeValidation: true,
};

// userModel.hasMany(moviesModel);
// userModel.hasMany(musicModel);


const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const movies = moviesModel(sequelize, DataTypes);
const music = musicModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  movies: new modelInterface(movies),
  music: new modelInterface(music),
  user,
};
