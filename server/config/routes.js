// const auth = require('./auth');
// const utils = require('./utils.js');

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
  // app.get('/api/users/');
  // app.post('/api/users/');
  // app.put('/api/users/');
  // app.delete('/api/users/');

  // // Events
  // app.get('/api/events');
  // app.post('/api/events');
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
