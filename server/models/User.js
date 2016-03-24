/**
 * Here we map out any User methods we need and return a new Pseudoclassical class
 * which extend the DB user.
 */

'use strict';
const Sequelize = require('sequelize');
const Auth = require('../controllers/Auth');

module.exports = function User(sequelizeInstance) {
  const seq = sequelizeInstance;
  
  seq.define('rel_user_requested_friends', {
    sender: Sequelize.BOOLEAN,
  });
  const user = seq.define('User', {
    userName: { type: Sequelize.STRING, allowNull: false, unique: true },
    pw: { type: Sequelize.STRING, allowNull: false },
    phone: Sequelize.STRING,
  }, {
    instanceMethods: {
      /**
       * Async method that returns a JWT or throws error if invalid
       */
      checkPasswordAndIssueJwt: function checkPasswordAndIssueJwt(pwToTest) {
        return Auth.compareHashAndVal(pwToTest, this.pw)
        .then((match) => {
          if (match) {
            return Auth.issueJwtToken({ userId: this.id });
          }
          throw Error('Invalid Credentials');
        });
      },
    },
    classMethods: {
      requestFriendship: function requestFriendship(userId1, userId2) {
        const addFriendRequest = this.findOne({ where: { id: userId1 } })
        .then(user => user.addRequest(userId2, { sender: true }));

        const checkRecipFriendRequest = this.findOne({ where: { id: userId2 } })
        .then(user => user.addRequest(userId1, { sender: false }));

        return Promise.all([addFriendRequest, checkRecipFriendRequest]);
      },
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
      createUser: function createUser(userName, pw) {
        // Use bcrypt to hash/salt the pw then call raw create
        return Auth.saltAndHash(pw)
        .then(hashedPw => this.rawCreate({ userName: userName, pw: hashedPw }));
      },
      getUser: function getUser(whereObj) {
        return this.findOne({ where: whereObj,
          include: [{ model: seq.models.Group },
            { model: seq.models.User, as: 'friend' },
            { model: seq.models.User, as: 'request' }],
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
            user.dataValues.requests = user.dataValues.request.map((friend) => {
              return { id: friend.id, userName: friend.userName, sender: friend.rel_user_requested_friends.sender };
            });
            user.dataValues.Groups = user.dataValues.Groups || [];
            delete user.dataValues.friend;
            delete user.dataValues.pw;
            delete user.dataValues.request;
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

  user.rawCreate = user.create;
  user.create = () => {
    throw Error('Use .createUser instead. It handles passwords and this does not.');
  };
  return user;
};

// To add a user to a group you could do either of the following
  // userInstance.addGroup(groupObj)  or addGroups (plural) and pass an array
  // groupInstance.addUser(userObj) or addUsers (plural)
