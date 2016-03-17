const config = require('../config/config.js');

// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);

const validateBody = res => {
  console.log(res);
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

export const postEvent = (event) => {
  const url = `${config.apiUrl}events`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(validateBody);
};

export const closeEvent = (event) => {
  console.log(event);
  const url = `${config.apiUrl}events/${event.id}/closeEvent`;
  return fetch(url, {
    method: 'POST',
  })
  .then(validateBody);
};

export const getUser = (userNameOrId) => {
  // To refactor fully, need to create new thunk action
  // that calls getUser and .then(user => dispatch({ type: 'SET_USER', user }))
  const url = `${config.apiUrl}users/${userNameOrId}`;
  return fetch(url, {
    method: 'GET',
    headers,
  })
  .then(validateBody)
  .catch(catchErr);
};

export const postUser = (userName) => {
  // To refactor fully, need to create new thunk action
  // that calls postUser and .then(user => dispatch(setUser(user.userName)))
  const url = `${config.apiUrl}users`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userName }),
    headers,
  })
  .then(validateBody)
  .catch(catchErr);
};

