import { combineReducers } from 'redux';

function userGroupMembers(state = [], action) {
  switch (action.type) {
    case 'SET_USER_GROUP_MEMBERS': {
      return action.userGroupMembers || state;
    }
    default:
      return state;
  }
}

module.exports.userGroupMembers = userGroupMembers;
