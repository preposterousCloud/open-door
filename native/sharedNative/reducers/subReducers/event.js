import { combineReducers } from 'redux';

function focusEventDetails(state = {}, action) {
  switch (action.type) {
    case 'SET_FOCUS_EVENT':
      return action.data || state;
    default:
      return state;
  }
}

module.exports = combineReducers({ focusEventDetails });
