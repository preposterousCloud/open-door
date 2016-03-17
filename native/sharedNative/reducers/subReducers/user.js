import { combineReducers } from 'redux';

function user(state = {}, action) {
  console.log('action', action);
  switch (action.type) {
    case 'SET_USER':
      return action.user || state;
    case 'SET_ACTIVE_EVENT':
      return Object.assign({}, state, { currentEvent: action.data });
    default:
      return state;
  }
}

module.exports = user;
