'use strict';

const db = require('../db/database').db;

const _mapEvent = (event) => {
  return { name: event.name,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    address1: event.addressStreet1,
    address2: event.addressStreet2,
    city: event.city,
    stateAbbrev: event.stateAbbrev,
    postalCode: event.postalCode,
  };
};

module.exports.createEvent = function createUser(req, res) {
  if (!req.body.name) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.Event.createEvent({ hostUser: req.body.hostUser,
      name: req.body.name,
      startDateUtc: req.body.startDateUtc,
      endDateUtc: req.body.endDateUtc,
      addressStreet1: req.body.addressStreet1,
      addressStreet2: req.body.addressStreet2,
      city: req.body.city,
      stateAbbrev: req.body.stateAbbrev,
      postalCode: req.body.postalCode,
      users: req.body.users,
      groups: req.body.groups })
    .then((event) => res.json(_mapEvent(event)))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unknown server problem');
    });
  }
};

module.exports.getEvents = function getUsers(req, res) {
  db.Event.findAll({
  })
  .then((events) => res.json(events.map(event => _mapEvent(event))))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem');
  });
};
