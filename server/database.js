/**
 * This file defines our database schema.  You can instantiate a new DB or reset your existing DB
 * with the command sequelize.sync({ force: true });
 */

const { dbName,
       dbPassword,
       dbUser,
       dbPort,
       dbHost } = require('./config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbName, dbName, dbPassword, {
  dialect: 'postgres',
  port: dbPort,
  host: dbHost,
});

const User = sequelize.define('User', {
  user_name: Sequelize.STRING,
});

const Group = sequelize.define('Group', {
  name: Sequelize.STRING,
});

const Event = sequelize.define('Event', {
  name: Sequelize.STRING,
  start_date_utc: Sequelize.DATE,
  end_date_utc: Sequelize.DATE,
  address_street_1: Sequelize.STRING,
  address_street_2: Sequelize.STRING,
  city: Sequelize.STRING,
  state_abbrev: Sequelize.STRING,
  postal_code: Sequelize.STRING,
});

User.belongsToMany(Group, { through: 'rel_user_group' });
Group.belongsToMany(User, { through: 'rel_user_group' });

User.belongsToMany(Event, { through: 'rel_user_event' });
Event.belongsToMany(User, { through: 'rel_user_event' });

Group.belongsToMany(Event, { through: 'rel_group_event' });
Event.belongsToMany(Group, { through: 'rel_group_event' });

Event.belongsTo(User, { as: 'host_user' });

module.exports = {
  User,
  Group,
  Event,
  sequelize,
};
