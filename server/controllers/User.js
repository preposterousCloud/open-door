'use strict';

const db = require('../db/database').db;

const _mapUser = (user) => {
  return {
    id: user.id,
    userName: user.userName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    Groups: user.Groups,
  };
};

module.exports.createUser = function createUser(req, res) {
  if (!req.body.userName) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.User.create({ userName: req.body.userName })
    .then((user) => res.json(_mapUser(user)))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unknown server problem');
    });
  }
};

module.exports.getUsers = function getUsers(req, res) {
  db.User.findAll({
    include: { model: db.Group },
  })
  .then((users) => res.json(users.map(user => _mapUser(user))))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem');
  });
};

module.exports.getUser = function getUser(req, res) {
  const arg = req.params.arg;
  const isInt = !isNaN(parseInt(arg, 10));

  let searchObj;
  if (isInt) {
    searchObj = { id: parseInt(arg, 10) };
  } else if (typeof arg === 'string') {
    searchObj = { userName: arg };
  } else {
    res.status(404).send('Invalid param. Provide ID or username');
  }

  db.User.getUser(searchObj)
  .then((data) => {
    if (!data) { throw new Error('User Not Found - User Controller 54:18'); }
    res.json(data);
  })
  .catch((err) => {
    console.error(err, err.stack);
    res.status(404).send(null);
  });
};

module.exports.requestFriendship = function requestFriendship(req, res) {
  db.User.requestFriendship(req.body.friends[0], req.body.friends[1])
  .then(result => {
    res.status(201).send(`${req.body.friends[0]} requested ${req.body.friends[1]}!`);
  })
  .catch(err => {
    console.error('Error creating friendship: ', err);
    res.status(500).send('Unknown server error');
  });
};

module.exports.addFriendship = function addFriendship(req, res) {
  db.User.addFriendship(req.body.friends[0], req.body.friends[1])
  .then(result => {
    if (result[0].length > 0) {
      res.status(201).send('Friendship created');
      return;
    }
    res.status(200).send('Friendship already existed');
  })
  .catch(err => {
    console.error('Error creating friendship: ', err);
    res.status(500).send('Unknown server error');
  });
};

module.exports.removeFriendship = function removeFriendship(req, res) {
  db.User.removeFriendship(req.body.friends[0], req.body.friends[1])
  .then(resultsRemoved => {
    if (resultsRemoved[0] > 0) {
      res.status(201).send('Friendship removed');
      return;
    }
    res.status(200).send('Friendship not found to begin with.');
  })
  .catch(err => {
    console.error('Error removing friendship: ', err);
    res.status(500).send('Unknown server error');
  });
};
