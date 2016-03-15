function navigator(state = {}, action) {
  switch (action.type) {
    case 'SET_APP_NAVIGATOR':
      return action.navigator;
    default:
      return state;
  }
}

function mockData(state = [], action) {
  switch (action.type) {
    case 'SET_MOCK_DATA':
      return action.data;
    default:
      return state;
  }
}

function focusEventDetails(state = {}, action) {
  switch (action.type) {
    case 'SET_FOCUS_EVENT':
      return action.data || state;
    default:
      return state;
  }
}

import { combineReducers, createStore } from 'redux';

const reducer = combineReducers({ navigator, mockData, focusEventDetails });
const store = createStore(reducer);

module.exports = {
  reducer,
  store,
};
