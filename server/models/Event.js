'use strict';

const Sequelize = require('sequelize');

module.exports = function Event(sequelizeInstance) {
  const seq = sequelizeInstance;
  
  const includeOnEvents = {
    include: [{ model: seq.models.Group },
             { model: seq.models.User, as: 'hostUser' },
             { model: seq.models.User }],
  };
  const event = sequelizeInstance.define('Event',
    {
      name: Sequelize.STRING,
      startDateUtc: Sequelize.DATE,
      endDateUtc: Sequelize.DATE,
      addressStreet1: Sequelize.STRING,
      addressStreet2: Sequelize.STRING,
      city: Sequelize.STRING,
      stateAbbrev: Sequelize.STRING,
      postalCode: Sequelize.STRING,
    },
    {
      instanceMethods: {
        closeEvent: function closeEvent() {
          this.endDateUtc = Date.now();
          return this.save();
        },
      },
      classMethods: {
        getEvent: function getEvent(id) {
          return this.findOne({ where: { id: id }, include: includeOnEvents.include });
        },
        getEvents: function getEvents(idArr) {
          this.findAll({where: {id: {$in: idArr }}})
        },
        createEvent: function createEvent(eventObj) {
          // TODO - check and make sure session user is equal to the hostUserId in the request
          return this.rawCreate(eventObj)
          .then((event) => {
            return event.setHostUser(eventObj.hostUserId)
            .then(() => {return event;});
          })
          .then((event) => {
            // If we got any users add them to the event
            let a;
            let b;
            if (eventObj.users) {
              a = event.setUsers(eventObj.users);
            }
            // If we got any groups add them to the event
            if (eventObj.groups) {
              b = event.setGroups(eventObj.groups);
            }
            return Promise.all([a, b]).then(() => event);
          });
        },
        makeEventTemplate: function makeEventTemplate(hostUser, name, startDateUtc, endDateUtc
        , addressStreet1, addressStreet2, city, stateAbbrev, postalCode, users, groups) {
          return {
            hostUserId: hostUser.id,
            name,
            startDateUtc,
            endDateUtc,
            addressStreet1,
            addressStreet2,
            city,
            stateAbbrev,
            postalCode,
            users,
            groups,
          };
        },
        getEventsForUser: function getEventsForUser(user) {
          if (!user.Groups) {
            throw Error('Invalid User object.  Make sure you are including the users groups');
          }

          const userInvites = this.findAll({
            include: [{ model: seq.models.User,
              where: { id: user.id } }],
            where: { endDateUtc: null },
          });

          const groupInvites = this.findAll({
            include: [{ model: seq.models.Group,
              where: { id: { $in: user.Groups.map(group => group.id) } } }],
            where: { endDateUtc: null },
          });

          const personalEvents = this.findAll({
            where: { hostUserId: user.id, endDateUtc: null },
          });

          return Promise.all([userInvites, groupInvites, personalEvents])
          .then((allEvents) => {
            let dedupedResults = {};
            allEvents.forEach((groupOfEvents) =>
              groupOfEvents.forEach((event) => {
                dedupedResults[event.id] = event;
              })
            );
            return Object.keys(dedupedResults).map(key => dedupedResults[key]);
          });
        },
      },
    });
  // API users should use our createEvent and not sequelize create because it
  // doesn't set the necessary fields
  event.rawCreate = event.create;
  event.create = () => {
    throw Error('Use .createEvent instead. If you want the native sequelize method use .rawCreate');
  };
  return event;
};
