const a = require('../ActionTypes');
import { postEvent, closeEvent, fetchAllUsers, postGroup, getUser, postUser } from '../utils/api';

const catchErr = (err) => {
  console.log(err);
  return null;
};

/** *****************************************************
 * Normal Action Creators
 * ************************************************** */
export function setLoading(loadingState) {
  return {
    type: a.TOGGLE_LOADING,
    data: loadingState,
  };
}

export function setActiveEvent(event) {
  console.log('set event', event);
  return {
    type: a.SET_ACTIVE_EVENT,
    data: event,
  };
}

export function setAllUsers(allUsers) {
  return {
    type: a.SET_ALL_USERS,
    allUsers: allUsers,
  };
}

export function setUser(user) {
  return {
    type: a.SET_USER,
    user: user,
  };
}

// NOT IN USE (usage: live typing)
export function liveUpdateGroupName(name) {
  return {
    type: a.SET_GROUPNAME_INPUT_DISP,
    groupName: name,
  };
}

export function updatePendingEvent(obj) {
  return {
    type: a.UPDATE_PENDING_EVENT,
    data: obj,
  };
}

export function setSwiperIndex(index) {
  return {
    type: a.SET_SWIPER_INDEX,
    data: index,
  };
}

export function markCheckbox(id, checklist) {
  return {
    type: a.TOGGLE_CHECKBOX,
    id: id,
    checklist,
  };
}

export function setUserChecklist(userChecklist) {
  return {
    type: a.CREATE_CHECKLIST,
    userChecklist,
  };
}

export function setFilterText(filterText = '') {
  return {
    type: a.SET_FILTER_TEXT,
    filterText,
  };
}

export function clearFilterText() {
  return setFilterText('');
}

export function toggleItemSelectionInList(id, listName) {
  return {
    type: a.TOGGLE_ITEM_SELECTION_IN_LIST,
    data: {
      id,
      listName,
    },
  };
}

/** *****************************************************
 * Async Thunk Action Creators
 * ************************************************** */
export function createUser(userName) {
  return dispatch => {
    return postUser(userName)
    .then(user => {
      dispatch(setUser(user));
      return user;
    })
    .catch(catchErr);
  };
}

export function attemptLogin(userName) {
  return dispatch => {
    return getUser(userName)
    .then(user => {
      if (user) {
        dispatch(setUser(user));
        return true;
      }
      return false;
    });
  };
}

export function getAllUsers() {
  return dispatch => {
    return fetchAllUsers()
    .then(users => {
      if (users) {
        dispatch(setAllUsers(users));
        return users;
      }
      return false;
    });
  };
}

export function refreshUser() {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    dispatch(setLoading(true));

    return getUser(userId)
    .then(user => dispatch(setUser(user)))
    .then(dispatch(setLoading(false)));
  };
}

export function storeGroup(groupName) {
  return (dispatch, getState) => {
    const checklist = getState().checklist;
    let members = [];
    for (var id in checklist) {
      if (checklist[id]) {members.push(+id);}
    }
    console.log(members);
    return postGroup(groupName, members)
    .then(user => {
      if (user) {
        console.log(`${groupName} created with ${members}!`);
        dispatch(refreshUser());
        getState().navigation.navigator.pop();
        return true;
      }
      return false;
    });
  };
}

export function createEvent(event) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    postEvent(event)
    .then((event) => {
      dispatch(setActiveEvent(event));
      dispatch(updatePendingEvent(null));
      dispatch(setLoading(false));
      dispatch(refreshUser());
      return event;
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.warn(err);
    });
  };
}

export function toggleEvent() {
  return (dispatch, getState) => {
    if (getState().user.currentEvent) {
      dispatch(setLoading(true));
      closeEvent(getState().user.currentEvent)
      .then((event) => {
        dispatch(setLoading(false));
        dispatch(setActiveEvent(null));
        dispatch(refreshUser());
      });
    } else if (getState().app.pendingEvent) {
      return dispatch(updatePendingEvent(null));
    } else {
      return dispatch(updatePendingEvent({}));
    }
  };
}
