import { combineReducers } from 'redux';

function user(state = { userName: '', Events: [] }, action) {
  switch (action.type) {
    case 'SET_USER': {
      return Object.assign({}, state, action.data);
    }
    case 'CLEAR_USER': {
      return {};
    }
    case 'SET_USER_EVENTS': {
      return Object.assign({}, state, { Events: action.data });
    }
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

function pendingRequests(state = {}, action) {
  switch (action.type) {
    case 'SET_PENDING_FRIEND_REQUESTS': {
      return action.reqs || state;
    }
    default:
      return state;
  }
}

module.exports.user = user;
module.exports.allUsers = allUsers;
module.exports.pendingRequests = pendingRequests;
