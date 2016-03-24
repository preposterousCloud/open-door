'use strict';

const db = require('../db/database').db;
const Auth = require('./Auth');

const _mapEvent = (event) => {
  return { name: event.name,
    id: event.id,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    address1: event.addressStreet1,
    address2: event.addressStreet2,
    city: event.city,
    stateAbbrev: event.stateAbbrev,
    postalCode: event.postalCode,
    hostUserId: event.hostUserId,
  };
};

module.exports.ensureUserOwnsEvents = (req, res, next) => {
  const eventId = req.params.id;
  db.Event.findOne({ where: { id: eventId } })
  .then((event) => {
    Auth._ensureUserHasValidJwt(req, res, next, (jwt) => {
      return jwt.userId === event.hostUserId;
    });
  });
};


module.exports.createEvent = function createUser(req, res) {
  if (!req.body.name) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    console.log(req.body);
    db.Event.createEvent({
      hostUserId: req.body.hostUserId,
      hostUserName: req.body.hostUserName,
      name: req.body.name,
      startDateUtc: req.body.startDateUtc,
      endDateUtc: req.body.endDateUtc,
      addressStreet1: req.body.addressStreet1,
      addressStreet2: req.body.addressStreet2,
      city: req.body.city,
      stateAbbrev: req.body.stateAbbrev,
      postalCode: req.body.postalCode,
      users: req.body.friends,
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

module.exports.getEvent = function getEvent(req, res) {
  const id = req.params.id;
  db.Event.getEvent(id)
  .then((event) => {
    res.json(event);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Unknown server problem.');
  });
};

module.exports.actionReducer = function actionReducer(req, res) {
  const action = req.params.action.toLowerCase();
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(404).send('Invalid ID');
    return;
  }

  const findEvent = db.Event.findOne({ where: { id: id } })
  .then((event) => {
    if (!event.id) {
      res.status(404).send('Invalid ID');
      return;
    }
    return event;
  });

  switch (action) {
    case 'closeevent':
      findEvent.then(event => event.closeEvent())
      .then((event) => {
        res.send(event);
      });
      break;
    default:
      res.status(404).send('Unknown action');
  }
};
