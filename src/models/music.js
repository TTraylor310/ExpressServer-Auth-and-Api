'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Music', {
    song: { type: DataTypes.STRING, required: true },
    artist: { type: DataTypes.STRING, required: true },
    genre: { type: DataTypes.ENUM('pop', 'rock', 'country', 'heavy metal', 'hip hop', 'r&b', 'classical', 'other'), required: true },
    year: { type: DataTypes.INTEGER, required: true},
  });
};
