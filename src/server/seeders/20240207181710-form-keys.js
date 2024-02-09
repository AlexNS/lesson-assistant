'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     const userId = await queryInterface.rawSelect('User', {
      where: {
        login: 'alex'
      },
     }, ['id']);

     const courseId = await queryInterface.rawSelect('Course', {
      where: {
        name: 'ВПК-1'
      }
     }, ['id']);

     if (userId && courseId) {
        await queryInterface.bulkInsert('FormKey', [{
          key: '123',
          formType: 1,
          entityId: courseId,
          active: true,
          qrPath: 'test',
          createdByUserId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          key: '3',
          formType: 2,
          entityId: courseId,
          active: true,
          qrPath: 'test',
          createdByUserId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
     }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FormKey', null, {});
  }
};
