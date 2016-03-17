import { reducer, store } from '../reducers/reducers.js';
import {
  statusOK,
  validateBody,
  catchErr,
  headers,
} from './helpers.js';
const config = require('../config/config.js');

const addFriend = (toId) => {
  return dispatch => {
    const url = `${config.apiUrl}friends/add`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({ friend: [store.getState().user.id, toId] }),
      headers,
    })
    .then(validateBody)
    .then(user => dispatch({ type: 'SET_USER', user }))
    .catch(catchErr);
  };
};

// const respondToFriendRequest = (acceptedRequest) => {
//   return dispatch => {
//     const url = `${config.apiUrl}users`;
//     return fetch(url, {
//       method: 'POST',
//       body: JSON.stringify({ acceptedRequest }),
//       headers,
//     })
//     .then(validateBody)
//     .then(user => dispatch(sendFriendRequest(user.userName)))
//     .catch(catchErr);
//   };
// };

module.exports = {
  addFriend,
  // respondToFriendRequest,
};
