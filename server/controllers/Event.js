'use strict';

const db = require('../db/database').db;
const Auth = require('./Auth');
const HttpError = require('./Errors').HttpError;
const imgur = require('imgur');

const _mapEvent = (event) => {
  return { name: event.name,
    id: event.id,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    location: event.location,
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


module.exports.createEvent = function createUser(req, res, next) {
  if (!req.body.name) {
    next(new HttpError(404, 'Make sure to include a user name and appropriate properties'));
  } else {
    const eventToCreate = req.body;
    db.Event.createEvent({
      hostUserId: req.jwt.userId,
      hostUserName: req.body.hostUserName,
      name: req.body.name,
      vibe: req.body.vibe,
      startDateUtc: req.body.startDateUtc,
      endDateUtc: req.body.endDateUtc,
      location: req.body.location,
      users: req.body.friends,
      groups: req.body.groups })
    .then((createdEvent) => {
      if (eventToCreate.base64Image) {
        imgur.uploadBase64(eventToCreate.base64Image)
        .then((imgurResponse) => {
          const updatedEvent = { eventPictureUri: imgurResponse.data.link };
          createdEvent.update(updatedEvent)
          .then(eventWithPicture => res.json(eventWithPicture));
        })
        .catch((err) => {
          delete createdEvent.eventPictureUri;
          res.json(createdEvent);
        });
      } else {
        res.json(_mapEvent(createdEvent));
      }
    })
    .catch((err) => {
      next(err);
    });
  }
};

module.exports.updateEvent = function updateEvent(req, res, next) {
  const eventId = req.params.id;
  db.Event.findOne({ where: { id: eventId } })
  .then((event) => {
    const newEventInfo = req.body;
    if (newEventInfo.base64Image) {
      // send it up to imgur
      imgur.uploadBase64(newEventInfo.base64Image)
      .then((imgurResponse) => {
        newEventInfo.eventPictureUri = imgurResponse.data.link;
        delete newEventInfo.base64Image;
        event.update(newEventInfo)
        .then(event => res.json(event));
      })
      .catch((err) => {
        res.json({ message: 'error updating user' });
        console.error(err.message);
      });
    } else {
      event.updateEvent(newEventInfo)
      .then((event) => res.json(event));
    }
  })
  .catch(err => {
    next(err);
  });
};

module.exports.getEvents = function getUsers(req, res, next) {
  const userId = req.jwt.userId;
  db.User.getUser({ id: userId })
  .then((user) => db.Event.getEventsForUser(user))
  .then((events) => res.json(events))
  .catch((err) => {
    next(err);
  });
};

module.exports.getEvent = function getEvent(req, res, next) {
  const id = req.params.id;
  db.Event.getEvent(id)
  .then((event) => {
    res.json(event);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.actionReducer = function actionReducer(req, res, next) {
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
      next(new HttpError(400, `Unknown action was specified: ${action}`));
  }
};
