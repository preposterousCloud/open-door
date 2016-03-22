'use strict';

const Sequelize = require('sequelize');
const db = require('../db/database').db;

const _mapGroup = (group) => {
  return {
    groupId: group.id,
    members: (group.Users.map(member => {
      return {
        id: member.id,
        userName: member.userName,
      };
    })),
  };
};

module.exports.createGroup = (req, res) => {
  if (!req.body.groupName || !req.body.members) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.Group.create({ name: req.body.groupName })
    .then((group) => {
      console.log('Group Updated: ', req.body);
      group.addUsers(JSON.parse(req.body.members))
      .then(() => {
        res.json(group);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unknown server problem');
    });
  }
};

module.exports.getGroups = (req, res) => {
  db.User.findOne({
    include: [{
      model: db.Group,
      include: [{
        model: db.User,
      }],
    }],
    where: {
      id: +req.params.id,
    },
  })
  .then((groups) => res.json(groups.Groups.map((group) => {
    return _mapGroup(group);
  })))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem');
  });
};
