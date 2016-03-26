const a = require('../ActionTypes');
import * as api from '../utils/api';

const localStore = require('react-native-simple-store');

const catchErr = (err) => {
  console.error(err);
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

export function setUser(obj) {
  return {
    type: a.SET_USER,
    data: obj,
  };
}

export function clearUser() {
  return {
    type: a.CLEAR_USER,
  };
}

export function setUserEvents(obj) {
  return {
    type: a.SET_USER_EVENTS,
    data: obj,
  };
}

export function setJwt(jwt) {
  return {
    type: a.SET_JWT,
    data: jwt,
  };
}

export function setPendingFriendRequests(reqs) {
  return {
    type: a.SET_PENDING_FRIEND_REQUESTS,
    reqs,
  };
}

// NOT IN USE (usage: live typing)
export function liveUpdateGroupName(name) {
  return {
    type: a.SET_GROUPNAME_INPUT_DISP,
    groupName: name,
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

export function clearItemSelectionInList(listName) {
  return {
    type: a.CLEAR_ITEMS_IN_SELECTION_LIST,
    data: {
      listName,
    },
  };
}

export function setUserGroupMembers(userGroupMembers) {
  return {
    type: a.SET_USER_GROUP_MEMBERS,
    userGroupMembers,
  };
}
/** *****************************************************
 * Synchronous Action Creators
 * ************************************************** */
export function sortPendingFriendRequests(user) {
  return (dispatch, getState) => {
    const reqs = user.requests;
    const sortedReqs = {
      sent: [],
      received: [],
    };
    reqs.forEach((req) => {
      if (req.sender) {
        sortedReqs.sent.push({
          id: req.id,
          userName: req.userName,
        });
      } else {
        sortedReqs.received.push({
          id: req.id,
          userName: req.userName,
        });
      }
    });
    return dispatch(setPendingFriendRequests(sortedReqs));
  };
}
/** *****************************************************
 * Async Thunk Action Creators
 * ************************************************** */
export function createUser(userName, pw) {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    return api.postUser(userName, pw, jwt)
    .then(response => {
      dispatch(setJwt(response.jwt));
      dispatch(setUser(response.user));
      return response.user;
    });
  };
}

export function setInLocalStorage(key, value) {
  return (dispatch) => {
    return localStore.save(key, value);
  };
}

export function logout() {
  return (dispatch, getState) => {
    return dispatch(setInLocalStorage('jwt', null))
    .then(() => {
      dispatch(clearUser());
      getState().navigation.navigator.resetTo({ name: 'Login' });
    });
  };
}

export function attemptLogin(userName, pw) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return api.loginUser(userName, pw)
    .then(response => {
      if (response) {
        console.log('res', response);
        dispatch(setLoading(false));
        dispatch(setJwt(response.jwt));
        dispatch(setUser(response.user));
        dispatch(setInLocalStorage('jwt', response.jwt));
        return true;
      }
      return false;
    });
  };
}
export function checkForJwtAndLogin() {
  return (dispatch, getState) => {
    localStore.get('jwt')
    .then((result) => {
      if (result) {
        dispatch(setJwt(result));
        getState().navigation.navigator.resetTo({ name: 'Main' });
      }
    });
  };
}

export function getUserEvents() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    api.getUserEvents(jwt)
    .then((events) => {
      dispatch(setUserEvents(events));
    });
  };
}

export function updateEvent(eventObjToSet) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const jwt = getState().app.jwt;
    return api.updateEvent(eventObjToSet, jwt)
    .then(event => {
      dispatch(setActiveEvent(event));
      dispatch(setLoading(false));
      // We should consider replacing the event in the full event list so
      // we don't have to refresh all of the events
    });
  };
}
export function appInit() {
  return (dispatch, getState) => {
    dispatch(refreshUser());
    dispatch(getUserEvents());
  };
}

export function getAllUsers() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    return api.fetchAllUsers(jwt)
    .then(users => {
      if (users) {
        dispatch(setAllUsers(users));
        return users;
      }
      return false;
    });
  };
}

/**
 * Refreshes user based on the jwt token we have.  This should always match the signed in user.
 */
export function refreshUser() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    dispatch(setLoading(true));

    return api.getUserByJwt(jwt)
    .then(user => {
      dispatch(setUser(user));
      dispatch(sortPendingFriendRequests(user));
    })
    .then(dispatch(setLoading(false)));
  };
}

export const requestFriend = (toId) => {
  return (dispatch, getState) => {
    return api.requestFriend(getState().user.id, toId, getState().app.jwt)
    .then(response => {
      console.log('Friendship requested?', response._bodyInit);
      return response;
    })
    .then(() => dispatch(refreshUser()))
    .catch(catchErr);
  };
};

export const confirmFriend = (toId) => {
  return (dispatch, getState) => {
    return api.confirmFriend(getState().user.id, toId, getState().app.jwt)
    .then(response => {
      console.log('Friendship confirmed?', response._bodyInit);
      return response;
    })
    .then(() => dispatch(refreshUser()))
    .catch(catchErr);
  };
};

export const rejectFriend = (toId) => {
  return (dispatch, getState) => {
    return api.rejectFriend(getState().user.id, toId, getState().app.jwt)
    .then(response => {
      console.log('Friendship rejected?', response._bodyInit);
      return response;
    })
    .then(() => dispatch(refreshUser()))
    .catch(catchErr);
  };
};

export function storeGroup(groupName) {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    const checklist = getState().checklist;
    const members = [getState().user.id];
    for (const id in checklist) {
      if (checklist[id]) {members.push(+id);}
    }
    console.log(members);
    return api.postGroup(groupName, members, jwt)
    .then(user => {
      if (user) {
        dispatch(refreshUser());
        getState().navigation.navigator.pop();
        return true;
      }
      return false;
    });
  };
}

export function getUserGroups() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    const id = getState().user.id;
    return api.fetchUserGroups(id, jwt)
    .then(groups => {
      if (groups) {
        const userGroups = {};
        groups.forEach((group) => {
          userGroups[group.groupId] = group.members;
        });
        return userGroups;
      }
      return false;
    });
  };
}

export function createEvent(event) {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    dispatch(setLoading(true));
    console.log('creating event:', event);
    api.postEvent(event, jwt)
    .then((event) => {
      dispatch(setActiveEvent(event));
      dispatch(setLoading(false));
      dispatch(getUserEvents());
      return event;
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.warn(err);
    });
  };
}

export function closeDoor() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    if (getState().user.currentEvent) {
      dispatch(setLoading(true));
      api.closeEvent(getState().user.currentEvent, jwt)
      .then((event) => {
        dispatch(setLoading(false));
        dispatch(setActiveEvent(null));
        dispatch(getUserEvents());
      });
    }
  };
}
