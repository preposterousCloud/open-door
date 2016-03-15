'use strict';

const Sequelize = require('sequelize');

module.exports = function Event(sequelizeInstance) {
  const seq = sequelizeInstance;
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
      classMethods: {
        createEvent: function createEvent(eventObj) {
          return this.rawCreate(eventObj)
          .then((event) => {
            return event.setHostUser(eventObj.hostUser)
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
        makeEventTemplate: function makeEvent(hostUser, name, startDateUtc, endDateUtc
        , addressStreet1, addressStreet2, city, stateAbbrev, postalCode, users, groups) {
          return {
            hostUser,
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
          });

          const groupInvites = this.findAll({
            include: [{ model: seq.models.Group,
              where: { id: { $in: user.Groups.map(group => group.id) } } }],
          });

          const personalEvents = this.findAll({
            where: { hostUserId: user.id },
          });

          return Promise.all([userInvites, groupInvites, personalEvents])
          .then((allEvents) => allEvents.reduce((memo, current) => memo.concat(current)));
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
