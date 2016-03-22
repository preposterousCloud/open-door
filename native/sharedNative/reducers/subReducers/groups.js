import { combineReducers } from 'redux';

// NOT IN USE (usage: live typing)
function groupName(state = '', action) {
  switch (action.type) {
    case 'SET_GROUPNAME_INPUT_DISP': {
      return action.groupName || state;
    }
    default:
      return state;
  }
}

module.exports = groupName;
