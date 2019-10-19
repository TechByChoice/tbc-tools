'use strict';
module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define('Directory', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    profile_img: DataTypes.STRING,
    role: DataTypes.STRING,
    profileBio: DataTypes.TEXT,
    status: DataTypes.STRING,
    zip: DataTypes.STRING,
    state: DataTypes.STRING,
    localChapter: DataTypes.STRING
  }, {});
  Directory.associate = function(models) {
    // associations can be defined here
  };
  return Directory;
};