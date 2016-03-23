'use strict';
// const auth = require('./auth');
// const utils = require('./utils.js');
const User = require('./User');
const Event = require('./Event');
const Group = require('./Group');
const Login = require('./Login');
const Auth = require('./Auth');

module.exports = (app) => {
  // Test
  app.get('/', (req, res) => {
    res.json('Whatup, AWS!');
  });

  // Auth
  // TODO make sure this route uses HTTPS
  app.post('/api/login', Login.loginUser);

  // User Profiles
  app.get('/api/users/', [Auth.ensureUserHasValidJwt, User.getUsers]);
  app.post('/api/users/', User.createUser);
  app.get('/api/users/:arg', User.getUser);

  // Events
  //  DISABLED - USERS SHOULD NOT HAVE ACCESS app.get('/api/events', Event.getEvents);
  app.post('/api/events', [Auth.ensureUserIsUser('hostUserId'), Event.createEvent]);
  app.post('/api/events/:id/:action', [Auth.ensureUserIsUser('hostUserId'), Event.actionReducer]);

  // Friends
  app.post('/api/friends/add', User.addFriendship);
  app.post('/api/friends/remove', User.removeFriendship);
  // app.get('/api/friends/request');
  // app.post('/api/friends/request');

  // // Groups
  app.get('/api/friends/groups/getGroupsForUser/:id', Group.getGroups);
  app.post('/api/friends/groups', Group.createGroup);
};

// First thing tomorrow write another middleware that compares JWT userId to the property specified in the middleware generateor.

// Eg.  ensureUserIsWhoTheySayTheyAre('hostUserId) would return middle ware that compares req.body.hostUserId to JWT.userId
        // The other option is stop sending user IDs in POSTs and blindly use the JWT token ID.