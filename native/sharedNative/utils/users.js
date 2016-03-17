import { reducer, store } from '../reducers/reducers.js';
import {
  statusOK,
  validateBody,
  catchErr,
  headers,
} from './helpers.js';
const config = require('../config/config.js');

const getAllUsers = () => {
  return dispatch => {
    const url = `${config.apiUrl}users`;
    return fetch(url, {
      method: 'GET',
      headers,
    })
    .then(validateBody)
    .then(users => dispatch({ type: 'SET_ALL_USERS', users }))
    .catch(catchErr);
  };
};

module.exports = {
  getAllUsers,
};
