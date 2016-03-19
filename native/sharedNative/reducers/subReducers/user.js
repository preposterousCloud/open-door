import { combineReducers } from 'redux';

function user(state = {}, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.user || state;
    case 'SET_ACTIVE_EVENT':
      return Object.assign({}, state, { currentEvent: action.data });
    default:
      return state;
  }
}

function allUsers(state = [], action) {
  switch (action.type) {
    case 'SET_ALL_USERS': {
      return action.allUsers || state;
    }
    default:
      return state;
  }
}

module.exports.user = user;
module.exports.allUsers = allUsers;
