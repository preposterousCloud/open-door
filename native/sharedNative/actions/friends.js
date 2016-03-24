import { reducer, store } from '../reducers/reducers.js';
import {
  catchErr,
} from '../utils/helpers.js';
import * as api from '../utils/api';
const actions = require('../actions/actions.js');

const addFriend = (toId) => {
  return dispatch => {
    return api.addFriend(store.getState().user.Id, toId)
    .then(response => {
      console.log('Friendship created?', response._bodyInit);
      return response;
    })
    .then(() => dispatch(actions.refreshUser()))
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
