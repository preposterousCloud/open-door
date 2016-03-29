'use strict';

const Sequelize = require('sequelize');
const db = require('../db/database').db;
const HttpError = require('./Errors').HttpError;

const _mapGroup = (group) => {
  return {
    groupId: group.id,
    groupPictureUri: group.groupPictureUri,
    members: (group.Users.map(member => {
      return {
        id: member.id,
        userName: member.userName,
      };
    })),
  };
};

module.exports.createGroup = (req, res, next) => {
  if (!req.body.groupName || !req.body.members) {
    next(new HttpError(404, 'Make sure to include groupName, members and other props'));
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
      next(err);
    });
  }
};

module.exports.addMember = (req, res, next) => {
  if (!req.body.groupId || !req.body.userId) {
    next(new HttpError(404, 'Make sure to include groupName, members and other props'));
  } else {
    db.Group.findOne({
      where: {
        id: +req.body.groupId,
      },
    })
    .then(group => {
      group.addUsers(req.body.userId)
      .then(() => {
        db.Group.findOne({ where: { id: group.id }, include: [{model: db.User}] })
        .then((updatedGroup) => {
          res.json(updatedGroup);
        });
      });
    });
  }
};

module.exports.getGroups = (req, res, next) => {
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
    next(err);
  });
};
