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

     await queryInterface.bulkInsert('Lesson', [
      { 
        title: 'Test 1',
        date: new Date(),
        courseId: courseId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const lessonId = await queryInterface.rawSelect('Lesson', {
      where: {
        title: 'Test 1'
      }
     }, ['id']);

     await queryInterface.bulkInsert('FormKey', [{
      key: '7',
      formType: 3,
      entityId: lessonId,
      active: true,
      qrPath: 'test',
      createdByUserId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    // TODO
  }
};
