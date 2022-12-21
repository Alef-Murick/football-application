/* eslint-disable max-lines-per-function */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(12),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(70),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
