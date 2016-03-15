'use strict';
// const auth = require('./auth');
// const utils = require('./utils.js');
const User = require('./User');
const Event = require('./Event');

module.exports = (app) => {
  // Test
  app.get('/', (req, res) => {
    res.json('Whatup, AWS!');
  });

  // // Auth
  // app.get('/auth/signedin');

  // // FB
  // app.get('/auth/facebook');
  // app.get('/auth/facebook/callback');

  // // User Profiles
  app.get('/api/users/', User.getUsers);
  app.post('/api/users/', User.createUser);
  // app.put('/api/users/');
  // app.delete('/api/users/');
  app.get('/api/users/:arg', User.getUser);
  // // Events
  app.get('/api/events', Event.getEvents);
  app.post('/api/events', Event.createEvent);
  // app.put('/api/events');
  // app.delete('/api/events');

  // // Friends
  //   // Friends list
  // app.get('/api/friends');
  // app.post('/api/friends');
  //   // Friend requests
  // app.get('/api/friends/request');
  // app.post('/api/friends/request');

  // // Groups
  // app.get('/api/friends/groups');
  // app.post('/api/friends/groups');
};
