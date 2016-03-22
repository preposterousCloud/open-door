const config = require('../config/config.js');

// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);

const validateBody = res => {
  if (statusOK(res)) {
    console.log(JSON.parse(res._bodyInit))
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

export const fetchAllUsers = () => {
  // To refactor fully, need to create new thunk action
  // NOTE: This will be replaced by "friends" in createGroup
  // Also should probably send id and name instead of whole objects
  const url = `${config.apiUrl}users/`;
  return fetch(url, {
    method: 'GET',
    headers,
  })
  .then(validateBody)
  .catch(catchErr);
};

export const postGroup = (groupName, members) => {
  const url = `${config.apiUrl}friends/groups`;
  const groupObj = JSON.stringify({
    groupName,
    members: JSON.stringify(members),
  });
  return fetch(url, {
    method: 'POST',
    body: groupObj,
    headers,
  })
  .then(validateBody)
  .catch(catchErr);
};

export const fetchUserGroups = (id) => {
  const url = `${config.apiUrl}friends/groups/getGroupsForUser/${id}`;
  return fetch(url, {
    method: 'GET',
    headers,
  })
  .then(validateBody)
  .catch(catchErr);
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
