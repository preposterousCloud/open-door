import { combineReducers } from 'redux';

function allUsers(state = [], action) {
  switch (action.type) {
    case 'SET_ALL_USERS': {
      return action.users || state;
    }
    default:
      return state;
  }
}

module.exports = allUsers;
