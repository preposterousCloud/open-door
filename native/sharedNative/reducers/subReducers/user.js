import { combineReducers } from 'redux';

function user(state = { userName: '', Events: [] }, action) {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.data };
    }
    case 'CLEAR_USER': {
      return {};
    }
    case 'SET_USER_EVENTS': {
      return { ...state, Events: action.data };
    }
    case 'SET_ACTIVE_EVENT':
      return { ...state, currentEvent: action.data };
    case 'REMOVE_FRIEND_FROM_USER': {
      const filteredFriends = state.friends.filter(friend => friend.id !== action.removalId);
      return { ...state, friends: filteredFriends };
    }
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

function contactMap(state = {}, action) {
  switch (action.type) {
    case 'SET_USERS_IN_CONTACTS': {
      return action.contactMap || state;
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
module.exports.contactMap = contactMap;
module.exports.pendingRequests = pendingRequests;
