import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import groupName from './subReducers/groups.js';
import navigation from './subReducers/navigation.js';
import { user, allUsers } from './subReducers/user.js';
const actions = require('../ActionTypes');

const app = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.TOGGLE_LOADING:
      return Object.assign({}, state, { isLoading: action.data });
    default:
      return state;
  }
};

const reducer = combineReducers({
  app,
  navigation,
  user,
  allUsers,
  groupName,
});

const store = createStore(reducer, applyMiddleware(thunk));

module.exports = {
  reducer,
  store,
};
