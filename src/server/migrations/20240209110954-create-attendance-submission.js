'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttendanceSubmission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Student', key: 'id' },
        allowNull: false
      },
      visitorId: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      geoData: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      lessonId: {
        type: Sequelize.INTEGER,
        references: { model: 'Lesson', key: 'id' },
        allowNull: false
      },
      invalid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttendanceSubmission');
  }
};