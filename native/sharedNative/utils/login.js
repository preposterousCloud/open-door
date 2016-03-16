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
    .then(res => {
      if (res.status === 200) {
        return JSON.parse(res._bodyInit);
      }
      throw new Error('User Not Found');
    })
    .then((user) => {
      console.log('user?', user);
      return dispatch({
        type: 'SET_USER',
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  };
};

module.exports = {
  setUser,
};
