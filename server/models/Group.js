const Sequelize = require('sequelize');

module.exports = function Group(sequelizeInstance) {
  return sequelizeInstance.define('Group', {
    name: Sequelize.STRING,
  });
};
