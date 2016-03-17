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
      addFriendship: function addFriendship(userId1, userId2) {
        // We put the smaller user ID on the left so we always know what the relationship looks like
        // for any given friendship
        const addFriendToOne = this.findOne({ where: { id: userId1 } })
        .then(user => user.addFriend(userId2));
        
        const addFriendToTwo = this.findOne({ where: { id: userId2 } })
        .then(user => user.addFriend(userId1));
        
        return Promise.all([addFriendToOne, addFriendToTwo]);
      },
      removeFriendship: function removeFriendship(userId1, userId2) {
        // Same as above, we sort the IDs
        const removeFriendFromOne = this.findOne({ where: { id: userId1 } })
        .then(user => user.removeFriend(userId2));
        
        const removeFriendFromTwo = this.findOne({ where: { id: userId2 } })
        .then(user => user.removeFriend(userId1));
        
        return Promise.all([removeFriendFromOne, removeFriendFromTwo]);
      },
      getUser: function getUser(whereObj) {
        return this.findOne({ where: whereObj,
          include: [{ model: seq.models.Group },
            { model: seq.models.User, as: 'friend' }],
        })
        .then((user) => {
          if (!user) { throw new Error('User not found'); }
          const getEvents = seq.models.Event.getEventsForUser(user);
          const eventQuery = {
            where: {
              hostUserId: user.id,
              endDateUtc: null,
            },
          };
          const getCurrentEvent = seq.models.Event.findAll(eventQuery)
          .then((events) => {
            if (events.length > 1) {
              console.error(`Active event is out of sync for userID=${user.id}.
                              Found ${events.length} events`);
              // sort and return most recent event;
              return events.sort()[0];
            }
            return events[0];
          });
          return Promise.all([getEvents, getCurrentEvent]).then((proms) => {
            user.dataValues.Events = proms[0];
            user.dataValues.currentEvent = proms[1];
            user.dataValues.friends = user.dataValues.friend.map((friend) => {
              return { id: friend.id, userName: friend.userName };
            });
            delete user.dataValues.friend;
            return user;
          });
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
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
};

// To add a user to a group you could do either of the following
  // userInstance.addGroup(groupObj)  or addGroups (plural) and pass an array
  // groupInstance.addUser(userObj) or addUsers (plural)
