'use strict'

const Sequelize = require('sequelize');
const db = require('../db/database').db;

module.exports.createGroup = function createGroup(req, res) {
  if (!req.body.groupName || !req.body.members) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.Group.create({ name: req.body.groupName })
    .then((group) => {
      console.log('Group Updated: ', req.body)
      group.addUsers(JSON.parse(req.body.members));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unknown server problem');
    });
  }
};
