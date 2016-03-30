'use strict';

const Sequelize = require('sequelize');
const db = require('../db/database').db;
const HttpError = require('./Errors').HttpError;
const Auth = require('./Auth');
const imgur = require('imgur');

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

module.exports.ensureUserIsInGroup = (req, res, next) => {
  const groupId = req.params.id;
  db.Group.findOne({ where: { id: groupId }, include: [{ model: db.User }] })
  .then((group) => {
    Auth._ensureUserHasValidJwt(req, res, next, (jwt) => {
      return group.Users.reduce((found, member) => found || member.id === jwt.userId, false);
    });
  });
};

module.exports.updateGroup = (req, res, next) => {
  const groupId = req.params.id;
  db.Group.findOne({ where: { id: groupId } })
  .then((group) => {
    if (req.body.encodedGroupPic) {
      imgur.uploadBase64(req.body.encodedGroupPic)
      .then((imgurResponse) => {
        const groupPictureUri = imgurResponse.data.link;
        group.update({ groupPictureUri })
        .then(group => {
          console.log('updated group:', group);
          res.json(group);
        });
      })
      .catch((err) => {
        res.json({ message: 'error updating user' });
        console.error(err.message);
      });
    }
  })
  .catch(err => {
    next(err);
  });
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
        db.Group.findOne({ where: { id: group.id }, include: [{ model: db.User }] })
        .then((updatedGroup) => {
          res.json(updatedGroup);
        });
      });
    });
  }
};

module.exports.removeMember = (req, res, next) => {
  if (!req.body.groupId || !req.body.userToRemoveId) {
    next(new HttpError(404, 'Make sure to include groupId and userToRemoveId'));
  } else {
    db.Group.findOne({
      where: {
        id: +req.body.groupId,
      },
    })
    .then(group => {
      group.removeUsers(req.body.userToRemoveId)
      .then(() => {
        db.Group.findOne({ where: { id: group.id }, include: [{ model: db.User }] })
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
