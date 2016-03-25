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
  console.error(err);
  return null;
};

const baseHeaders = { 'Content-Type': 'application/json' };

const buildHeaders = (jwt) => {
  return {
    'Content-Type': 'application/json',
    access_token: jwt,
  };
};

// HTTP methods
export const loginUser = (userName, pw, jwt) => {
  const url = `${config.apiUrl}login`;
  const body = {
    userName,
    pw,
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const getEvent = (eventId, jwt) => {
  const url = `${config.apiUrl}events/${eventId}`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const postEvent = (event, jwt) => {
  const url = `${config.apiUrl}events`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const closeEvent = (event, jwt) => {
  const url = `${config.apiUrl}events/${event.id}/closeEvent`;
  return fetch(url, {
    method: 'POST',
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const fetchAllUsers = (jwt) => {
  // To refactor fully, need to create new thunk action
  // NOTE: This will be replaced by "friends" in createGroup
  // Also should probably send id and name instead of whole objects
  const url = `${config.apiUrl}users/`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const postGroup = (groupName, members, jwt) => {
  const url = `${config.apiUrl}friends/groups`;
  const groupObj = JSON.stringify({
    groupName,
    members: JSON.stringify(members),
  });
  return fetch(url, {
    method: 'POST',
    body: groupObj,
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const fetchUserGroups = (id, jwt) => {
  const url = `${config.apiUrl}friends/groups/getGroupsForUser/${id}`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const getUser = (userNameOrId, jwt) => {
  // To refactor fully, need to create new thunk action
  // that calls getUser and .then(user => dispatch({ type: 'SET_USER', user }))
  const url = `${config.apiUrl}users/${userNameOrId}`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
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
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const postUser = (userName, pw, jwt) => {
  // To refactor fully, need to create new thunk action
  // that calls postUser and .then(user => dispatch(setUser(user.userName)))
  const url = `${config.apiUrl}users`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userName, pw }),
    headers: buildHeaders(),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const addFriend = (requesterId, toFriendId, jwt) => {
  const url = `${config.apiUrl}friends/request`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ friends: [requesterId, toFriendId] }),
    headers: buildHeaders(jwt),
  });
};
