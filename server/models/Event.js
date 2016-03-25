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
      vibe: Sequelize.STRING,
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
        updateEvent: function updateEvent(objToSet) {
          return this.update(objToSet)
          .then((event) => {
            let setFriends;
            let setGroups;
            if (objToSet.friends) {
              setFriends = this.setUsers(objToSet.friends);
            }
            if (objToSet.groups) {
              setGroups = this.setGroups(objToSet.groups);
            }
            return Promise.all([setFriends, setGroups])
            .then(() => {
              // We refetch the event so the object returned includes Groups and Friends
              return seq.models.Event.getEvent(event.id);
            });
          });
        },
      },
      classMethods: {
        getEvent: function getEvent(id) {
          return this.findOne({ where: { id: id }, include: includeOnEvents.include });
        },
        getEvents: function getEvents(idArr) {
          this.findAll({ where: { id: { $in: idArr } } });
        },
        createEvent: function createEvent(eventObj) {
          // TODO - check and make sure session user is equal to the hostUserId in the request
          return this.rawCreate(eventObj)
          .then((event) => {
            return event.setHostUser(eventObj.hostUserId)
            .then(() => {return event;});
          })
          .then((event) => {
            const a = event.setUsers(eventObj.users || []);
            const b = event.setGroups(eventObj.groups || []);
            return Promise.all([a, b]).then(() => event);
          });
        },
        makeEventTemplate: function makeEventTemplate(hostUser, name, vibe, startDateUtc, endDateUtc
        , addressStreet1, addressStreet2, city, stateAbbrev, postalCode, users, groups) {
          users = users || [];
          groups = groups || [];
          return {
            hostUserId: hostUser.id,
            hostUserName: hostUser.userName,
            name,
            vibe,
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
            include: [{
              model: seq.models.User,
              where: { id: user.id },
            }, {
              model: seq.models.User,
              as: 'hostUser',
            }],
            where: { endDateUtc: null },
          });

          const groupInvites = this.findAll({
            include: [{
              model: seq.models.Group,
              where: {
                id: { $in: user.Groups.map(group => group.id) },
              },
            }, {
              model: seq.models.User,
              as: 'hostUser',
            }],
            where: { endDateUtc: null },
          });

          const personalEvents = this.findAll({
            include: [{
              model: seq.models.User,
              as: 'hostUser',
            }],
            where: { hostUserId: user.id, endDateUtc: null },
          });

          return Promise.all([userInvites, groupInvites, personalEvents])
          .then((allEvents) => {
            const dedupedResults = {};
            allEvents.forEach((groupOfEvents) =>
              groupOfEvents.forEach((event) => {
                dedupedResults[event.id] = dedupedResults[event.id] || event;
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
