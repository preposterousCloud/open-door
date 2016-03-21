import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import groupName from './subReducers/groups.js';
import { checklist, checkboxChecked } from './subReducers/common.js'
import navigation from './subReducers/navigation.js';
import { user, allUsers } from './subReducers/user.js';
const actions = require('../ActionTypes');

const defaultState = {
  isLoading: false,
  pendingEvent: null,
  swiperIndex: 1,
};

const app = (state = defaultState, action) => {
  console.log('action=', action, 'state=', state);

  switch (action.type) {
    case actions.TOGGLE_LOADING:
      return Object.assign({}, state, { isLoading: action.data });

    case actions.UPDATE_PENDING_EVENT: {
      const pendingEvent = (action.data === null) ? null :
        Object.assign({}, state.pendingEvent, action.data);
      return Object.assign({}, state, { pendingEvent: pendingEvent });
    }

    case actions.SET_SWIPER_INDEX: {
      return Object.assign({}, state, { swiperIndex: action.data });
    }

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
  checklist,
  checkboxChecked,
});

const store = createStore(reducer, applyMiddleware(thunk));

module.exports = {
  reducer,
  store,
};
