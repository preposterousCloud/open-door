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

const createUser = (userName) => {
  return (dispatch) => {
    const url = `${config.apiUrl}users`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userName: userName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      console.log('response got back:', res);
      if (res.status >= 200 && res.status <= 299) {
        return JSON.parse(res._bodyInit);
      }
      throw new Error('User Creation Failed');
    })
    .then((user) => {
      console.log('user being set:', user);
      return store.dispatch(setUser(user.userName));
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  };
};

module.exports = {
  setUser,
  createUser,
};
