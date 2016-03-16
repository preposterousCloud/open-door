import { reducer, store } from '../reducers/reducers.js';
import {
  statusOK,
  validateBody,
  catchErr,
  headers,
} from './helpers.js';
const config = require('../config/config.js');

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
