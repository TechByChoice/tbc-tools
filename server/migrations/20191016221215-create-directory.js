'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Directories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pronouns: {
        type: Sequelize.STRING
      },
      profile_img: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      profileBio: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      localChapter: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Directories');
  }
};