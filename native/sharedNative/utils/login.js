import { reducer, store } from '../reducers/reducers.js';
const config = require('../config/config.js');


// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);

const validateBody = res => {
  if (statusOK(res)) {
    return JSON.parse(res._bodyInit);
  }
  throw new Error('User Creation Failed');
};

const catchErr = (err) => {
  console.log(err);
  return null;
};

const headers = { 'Content-Type': 'application/json' };

// HTTP methods
const setUser = (userName) => {
  return dispatch => {
    const url = `${config.apiUrl}users/${userName}`;
    return fetch(url, {
      method: 'GET',
      headers,
    })
    .then(validateBody)
    .then(user => dispatch({ type: 'SET_USER', user }))
    .catch(catchErr);
  };
};

const createUser = (userName) => {
  return dispatch => {
    const url = `${config.apiUrl}users`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userName }),
      headers,
    })
    .then(validateBody)
    .then(user => dispatch(setUser(user.userName)))
    .catch(catchErr);
  };
};

module.exports = {
  setUser,
  createUser,
};
