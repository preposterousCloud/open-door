const config = require('../config/config.js');

// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);

const validateBody = res => {
  if (statusOK(res)) {
    return JSON.parse(res._bodyInit);
  }
  throw new Error('Error processing request', res);
};

const catchErr = (err) => {
  console.log(err);
  return null;
};

const headers = { 'Content-Type': 'application/json',
  'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ1ODc4ODUzMX0.gook8XulG6ipx7GPUz22okCLwM5dh19y_zvl05vvaJc' };

// HTTP methods

export const loginUser = (userName, pw) => {
  const url = `${config.apiUrl}login`;
  const body = {
    userName,
    pw,
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
  .then(validateBody);
};

export const postEvent = (event) => {
  console.log('posting event:', event);
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

export const getUserByJwt = (jwt) => {
  // To refactor fully, need to create new thunk action
  // that calls getUser and .then(user => dispatch({ type: 'SET_USER', user }))
  const url = `${config.apiUrl}users/me`;
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
