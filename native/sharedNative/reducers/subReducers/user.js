import { combineReducers } from 'redux';

function user(state = {}, action) {
  switch (action.type) {
    case 'SET_USER': {
      return action.user || state;
    }
    default:
      return state;
  }
}

module.exports = user;
