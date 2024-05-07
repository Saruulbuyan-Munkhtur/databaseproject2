const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'harroldtok', '6969', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;