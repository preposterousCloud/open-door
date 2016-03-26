'use strict';

const db = require('../db/database').db;
const Auth = require('./Auth');
const HttpError = require('./Errors').HttpError;

const _mapUser = (user) => {
  return {
    id: user.id,
    userName: user.userName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    Groups: user.Groups,
  };
};

module.exports.createUser = function createUser(req, res, next) {
  if (!req.body.userName || !req.body.pw || !req.body.phone) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.User.createUser(req.body.userName, req.body.pw, req.body.phone)
    .then((user) => {
      const resObj = {
        user: _mapUser(user),
      };
      Auth.issueJwtToken({ userId: user.id })
      .then((token) => {
        resObj.jwt = token;
        res.json(resObj);
      });
    })
    .catch(next);
  }
};

module.exports.updateUser = function createUser(req, res, next) {
  if (!req.body.userName || !req.body.defaultVibe) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.User.findOne({ where: { id: req.jwt.userId } })
    .then((user) => {
      db.User.findOne({ where: { userName: req.body.userName } })
      .then(conflictingUser => {
        if (conflictingUser) {
          return next(new HttpError(409, 'Username already taken'));
        }
        user.update(req.body);
        res.json({ message: 'user updated' });
        return user;
      });
    })
    .catch(next);
  }
};

module.exports.getUsers = function getUsers(req, res, next) {
  db.User.findAll({
    include: { model: db.Group },
  })
  .then((users) => res.json(users.map(user => _mapUser(user))))
  .catch(next);
};

module.exports.getUser = function getUser(req, res, next) {
  const arg = req.params.arg;
  const isInt = !isNaN(parseInt(arg, 10));

  let searchObj;
  if (isInt) {
    searchObj = { id: parseInt(arg, 10) };
  } else if (typeof arg === 'string') {
    searchObj = { userName: arg };
  } else {
    next(new HttpError(400, 'Invalid param.  Provide ID or userName'));
  }

  db.User.getUser(searchObj)
  .then((data) => {
    if (!data) {
      throw new HttpError(404, 'User does not exist');
    }
    res.json(data);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.getUserFromJwt = function getUserFromJwt(req, res, next) {
  const searchObj = { id: req.jwt.userId };
  db.User.getUser(searchObj)
  .then((data) => {
    if (!data) {
      throw new HttpError(404, 'User does not exist');
    }
    res.json(data);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.requestFriendship = function requestFriendship(req, res, next) {
  db.User.requestFriendship(req.body.friends[0], req.body.friends[1])
  .then(result => {
    console.log(result, result[0].length, result[1].length);
    if (result[0].length > 0) {
      res.status(201).send(`${req.body.friends[0]} requested ${req.body.friends[1]}!`);
      return;
    }
    res.status(200).send('Friendship already exists');
  })
  .catch(err => {
    next(err);
  });
};

module.exports.addFriendship = function addFriendship(req, res, next) {
  db.User.addFriendship(req.body.friends[0], req.body.friends[1])
  .then(result => {
    if (result[0].length > 0) {
      res.status(201).send('Friendship created');
      return;
    }
    res.status(200).send('Friendship already existed');
  })
  .catch(err => {
    next(err);
  });
};

module.exports.rejectFriendship = function addFriendship(req, res, next) {
  db.User.rejectFriendship(req.body.friends[0], req.body.friends[1])
  .then(result => {
    if (result[0].length > 0) {
      res.status(201).send('Ouch. Rejected.');
      return;
    }
    res.status(200).send('You can\'t reject that which hasn\'t requested you');
  })
  .catch(err => {
    next(err);
  });
};

module.exports.removeFriendship = function removeFriendship(req, res, next) {
  db.User.removeFriendship(req.body.friends[0], req.body.friends[1])
  .then(resultsRemoved => {
    if (resultsRemoved[0] > 0) {
      res.status(201).send('Friendship removed');
      return;
    }
    res.status(200).send('Friendship not found to begin with.');
  })
  .catch(err => {
    next(err);
  });
};
