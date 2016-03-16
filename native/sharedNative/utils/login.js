import { reducer, store } from '../reducers/reducers.js';
const config = require('../config/config.js');

const setUser = (userName) => {
  return (dispatch) => {
    const url = `${config.apiUrl}users/${userName}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((user) => {
      return dispatch({
        type: 'SET_USER',
        user: JSON.parse(user._bodyInit),
      });
    });
  };
};

module.exports = {
  setUser,
};
