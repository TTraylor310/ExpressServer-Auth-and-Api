'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movies', {
    title: { type: DataTypes.STRING, required: true },
    genre: { type: DataTypes.ENUM('action', 'adventure', 'drama', 'comedy', 'thriller', 'horror', 'science fiction'), required: true },
    year: { type: DataTypes.INTEGER, required: true },
  });
};
