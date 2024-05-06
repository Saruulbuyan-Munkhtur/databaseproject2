const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_database', 'saruul', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;