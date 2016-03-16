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
