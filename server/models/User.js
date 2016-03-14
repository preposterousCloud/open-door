/**
 * Here we map out any User methods we need and return a new Pseudoclassical class
 * which extend the DB user.
 */

const UserDbModel = require('../db/database').User;
const Sequelize = require('sequelize');

module.exports = function User(sequelizeInstance) {
  return sequelizeInstance.define('User', {
    user_name: Sequelize.STRING,
  });
};
