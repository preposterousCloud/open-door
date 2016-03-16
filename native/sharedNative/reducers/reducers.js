import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import navigation from './subReducers/navigation.js';
import user from './subReducers/user.js';
import event from './subReducers/event.js';

const reducer = combineReducers({
  navigation,
  user,
  event,
});

const store = createStore(reducer, applyMiddleware(thunk));

module.exports = {
  reducer,
  store,
};
