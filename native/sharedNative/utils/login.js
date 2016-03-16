const baseUrl = 'http://localhost:3000/api/';
import { reducer, store } from '../reducers/reducers.js';

const setUser = (userName) => {
  return (dispatch) => {
    const url = `${baseUrl}users/${userName}`;
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
