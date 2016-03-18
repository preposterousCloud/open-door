import { combineReducers } from 'redux';

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
