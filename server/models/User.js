/**
 * Here we map out any User methods we need and return a new Pseudoclassical class
 * which extend the DB user.
 */

'use strict';
const Sequelize = require('sequelize');

module.exports = function User(sequelizeInstance) {
  const seq = sequelizeInstance;
  return seq.define('User', {
    userName: Sequelize.STRING,
  }, {
    classMethods: {
      getUser: function getUser(whereObj) {
        return this.findOne({ where: whereObj,
          include: [{ model: seq.models.Group }],
        })
        .then((user) => {
          if (!user) { throw new Error('User not found'); }
          const getEvents = seq.models.Event.getEventsForUser(user);
          const getCurrentEvent = seq.models.Event.findAll({ where: { hostUserId: user.id, endDateUtc: null } })
          .then((events) => {
            if (events.length > 1) {
              console.error(`Active event is out of sync for userID=${user.id}. Found ${events.length} events`);
              // sort and return most recent event;
              return events.sort()[0];
            }
            return events[0];
          });
          return Promise.all([getEvents, getCurrentEvent]).then((proms) => {
            user.dataValues.Events = proms[0];
            user.dataValues.currentEvent = proms[1];
            return user;
          });
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      },
    },
  });
};

// To add a user to a group you could do either of the following
  // userInstance.addGroup(groupObj)  or addGroups (plural) and pass an array
  // groupInstance.addUser(userObj) or addUsers (plural)
