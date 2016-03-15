'use strict';

const db = require('../db/database').db;
const _ = require('underscore');

module.exports.createUser = function createUser(req, res) {
  if (!req.body.userName) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  }
  const userObj = _.pluck(req.body, 'userName');
  db.User.create(userObj)
  .then((user) => res.json(_.pluck(user, ['id', 'userName'])))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem');
  });
};

module.exports.getUsers = function getUsers(req, res) {
  db.User.findAll({
    include: { model: db.Group },
  })
  .then((users) => res.json(_.pluck(users, ['id', 'userName'])))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem');
  });
};
