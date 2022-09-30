'use strict';

const { Sequelize, DataTypes } = require('sequelize');



const DATABASE_URL = 'sqlite::memory';

const sequelizeDB = Sequelize(DATABASE_URL);
const movies = MovieModel(sequelizeDB, DataTypes);
// const music = MusicModel(sequelizeDB, DataTypes);
// const users = UserModel(sequelizeDB, DataTypes);

module.exports = {
  sequelizeDB,
  
}