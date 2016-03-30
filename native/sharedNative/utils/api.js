const config = require('../config/config.js');

// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);


const HttpError = function HttpError(statusCode, message, url) {
  this.name = 'HttpError';
  this.message = message;
  this.status = statusCode;
  this.err = true;
  this.url = url;
};

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

/**
 * On a successful response, returns the parsed body of the response.  On failure,
 * it returns the body along w/ .err property.
 */
const validateBody = res => {
  if (statusOK(res)) {
    return JSON.parse(res._bodyInit);
  }
  const errorMessage = `Error processing request: Message: ${res._bodyText}
    url: ${res.url}
    status: ${res.status}`;
  throw new HttpError(res.status, errorMessage,
    res.url);
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
export const loginUser = (userName, pw, phone, jwt) => {
  const url = `${config.apiUrl}login`;
  const body = {
    userName,
    pw,
    phone,
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

export const getUserEvents = (jwt) => {
  const url = `${config.apiUrl}events/me`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const postEvent = (event, jwt) => {
  const url = `${config.apiUrl}events/me`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: buildHeaders(jwt),
  })
  .then(validateBody);
};

export const updateEvent = (event, jwt) => {
  const url = `${config.apiUrl}events/${event.id}`;
  return fetch(url, {
    method: 'PUT',
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
  const url = `${config.apiUrl}users/`;
  return fetch(url, {
    method: 'GET',
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const updateUser = (newUserInfo, jwt) => {
  const url = `${config.apiUrl}users/me`;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(newUserInfo),
    headers: buildHeaders(jwt),
  })
  .then((body) => { //
    return body;    // This probably isn't necessary
  })                //
  .then(validateBody);
};

export const updateGroupPic = (groupId, encodedGroupPic, jwt) => {
  const url = `${config.apiUrl}groups/${groupId}`;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ encodedGroupPic }),
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .then((groupNoMembers) => groupNoMembers.groupPictureUri); // JSON.parse(body._bodyInit))
};

export const usersExistByContact = (contacts, jwt) => {
  const url = `${config.apiUrl}users/addressbook`;
  const contactsObj = JSON.stringify({
    contacts: JSON.stringify(contacts),
  });
  return fetch(url, {
    method: 'POST',
    body: contactsObj,
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

export const addToGroup = (groupId, userId, myId, jwt) => {
  const url = `${config.apiUrl}friends/groups`;
  const groupObj = JSON.stringify({
    groupId,
    userId,
    myId,
  });
  return fetch(url, {
    method: 'PUT',
    body: groupObj,
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const removeFromGroup = (groupId, userToRemoveId, myId, jwt) => {
  const url = `${config.apiUrl}friends/groups`;
  const groupObj = JSON.stringify({
    groupId,
    userToRemoveId,
    myId,
  });
  return fetch(url, {
    method: 'DELETE',
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

export const postUser = (userName, pw, phone, jwt) => {
  // To refactor fully, need to create new thunk action
  // that calls postUser and .then(user => dispatch(setUser(user.userName)))
  const url = `${config.apiUrl}users`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userName, pw, phone }),
    headers: buildHeaders(),
  })
  .then(validateBody)
  .catch(catchErr);
};

export const requestFriend = (requesterId, toFriendId, jwt) => {
  const url = `${config.apiUrl}friends/request`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ friends: [requesterId, toFriendId] }),
    headers: buildHeaders(jwt),
  });
};

export const confirmFriend = (requesterId, toFriendId, jwt) => {
  const url = `${config.apiUrl}friends/add`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ friends: [requesterId, toFriendId] }),
    headers: buildHeaders(jwt),
  });
};

export const rejectFriend = (requesterId, toFriendId, jwt) => {
  const url = `${config.apiUrl}friends/reject`;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({ friends: [requesterId, toFriendId] }),
    headers: buildHeaders(jwt),
  });
};

export const removeFriendship = (userToUnfriendId, jwt) => {
  const url = `${config.apiUrl}friends/unfriend`;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({ userToUnfriendId }),
    headers: buildHeaders(jwt),
  })
  .then(validateBody)
  .catch(catchErr);
};
