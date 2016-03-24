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
  app.get('/api/users/me', Auth.ensureUserHasValidJwt, User.getUserFromJwt);
  app.get('/api/users/', [Auth.ensureUserHasValidJwt, User.getUsers]);
  app.post('/api/users/', User.createUser);
  app.get('/api/users/:arg', User.getUser);

  // Events
  //  DISABLED - USERS SHOULD NOT HAVE ACCESS app.get('/api/events', Event.getEvents);
  app.post('/api/events', [Auth.ensureUserIsUser('hostUserId'), Event.createEvent]);
  app.post('/api/events/:id/:action', [Event.ensureUserOwnsEvents, Event.actionReducer]);

  // Friends
  app.post('/api/friends/add', [Auth.ensureUserIsUser((req, jwt) => {
    return req.body.friends[0] === jwt.userId || req.body.friends[1] === jwt.userId;
  }), User.addFriendship]);
  app.post('/api/friends/remove', [Auth.ensureUserIsUser((req, jwt) => {
    return req.body.friends[0] === jwt.userId || req.body.friends[1] === jwt.userId;
  }), User.removeFriendship]);

  // Friends
  app.post('/api/friends/add', [Auth.ensureUserIsUser((req, jwt) => {
    return req.body.friends[0] === jwt.userId || req.body.friends[1] === jwt.userId;
  }), User.addFriendship]);
  app.post('/api/friends/remove', [Auth.ensureUserIsUser((req, jwt) => {
    return req.body.friends[0] === jwt.userId || req.body.friends[1] === jwt.userId;
  }), User.removeFriendship]);
  app.post('/api/friends/remove', User.removeFriendship);

  // Groups
  app.get('/api/friends/groups/getGroupsForUser/:id', [Auth.ensureUserIsUser((req, jwt) => {
    return parseInt(req.params.id, 10) === parseInt(jwt.userId, 10);
  }), Group.getGroups]);
  app.post('/api/friends/groups', [Auth.ensureUserIsUser((req, jwt) => {
    return req.body.members.indexOf(jwt.userId) > -1;
  }), Group.createGroup]);
};
