import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { groupName, userGroupMembers } from './subReducers/groups.js';
import { checklist, checkboxChecked, filterText } from './subReducers/common.js';
import navigation from './subReducers/navigation.js';
import { user, allUsers, pendingRequests } from './subReducers/user.js';
const actions = require('../ActionTypes');

const defaultState = {
  isLoading: false,
  pendingEvent: null,
  swiperIndex: 1,
  pendingSelections: { friendsToInvite: {}, groupsToInvite: {} },
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_JWT:
      return Object.assign({}, state, { jwt: action.data });
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

    case actions.TOGGLE_ITEM_SELECTION_IN_LIST: {
      const listToUpdate = action.data.listName;
      const idToToggle = action.data.id;

      const newState = Object.assign({}, state);
      if (!newState.pendingSelections[listToUpdate]) {
        newState.pendingSelections[listToUpdate] = {};
      }
      newState.pendingSelections[listToUpdate][idToToggle] =
        !newState.pendingSelections[listToUpdate][idToToggle];
      return newState;
    }
    case actions.CLEAR_ITEMS_IN_SELECTION_LIST: {
      const newState = Object.assign({}, state);
      newState.pendingSelections[action.data.listName] = {};
      return newState;
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
  pendingRequests,
  groupName, // NOT IN USE (usage: live typing)
  userGroupMembers,
  checklist,
  checkboxChecked,
  filterText,
});

const store = createStore(reducer, applyMiddleware(thunk));

module.exports = {
  reducer,
  store,
};
