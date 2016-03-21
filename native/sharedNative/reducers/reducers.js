import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import groupName from './subReducers/groups.js';
import { checklist, checkboxChecked, filterText } from './subReducers/common.js';
import navigation from './subReducers/navigation.js';
import { user, allUsers } from './subReducers/user.js';
const actions = require('../ActionTypes');

const defaultState = {
  isLoading: false,
  pendingEvent: null,
  swiperIndex: 1,
  pendingSelections: { friendsToInvite: {} },
};

const app = (state = defaultState, action) => {
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

    case actions.TOGGLE_ITEM_SELECTION_IN_LIST: {
      const listToUpdate = action.data.listName;
      const idToToggle = action.data.id;
      
      const newState = Object.assign({}, state);
      if (!newState.pendingSelections[listToUpdate]) {
        newState.pendingSelections[listToUpdate] = {};
      }
      newState.pendingSelections[listToUpdate][idToToggle] =
        !newState.pendingSelections[listToUpdate][idToToggle];
        
      console.log('new state>>>>>>>>>>>>>>>>>', newState);
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
  groupName, // NOT IN USE (usage: live typing)
  checklist,
  checkboxChecked,
  filterText,
});

const store = createStore(reducer, applyMiddleware(thunk));

module.exports = {
  reducer,
  store,
};
