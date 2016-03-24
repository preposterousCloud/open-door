const a = require('../ActionTypes');
import {
  postEvent,
  closeEvent,
  fetchAllUsers,
  postGroup,
  fetchUserGroups,
  getUser,
  postUser,
  loginUser,
  getUserByJwt,
} from '../utils/api';

const localStore = require('react-native-simple-store');

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

export function setUser(obj) {
  return {
    type: a.SET_USER,
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
        sortedReqs.sent.push(req.id);
      } else {
        sortedReqs.received.push(req.id);
      }
    });
    return dispatch(setPendingFriendRequests(sortedReqs));
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


export function setInLocalStorage(key, value) {
  return (dispatch) => {
    return localStore.save(key, value);
  };
}

export function attemptLogin(userName, pw) {
  return (dispatch, getState) => {
    console.log(pw);
    dispatch(setLoading(true));
    return loginUser(userName, pw)
    .then(response => {
      if (response) {
        console.log('res', response);
        dispatch(setLoading(false));
        dispatch(sortPendingFriendRequests(response.user));
        dispatch(setJwt(response.jwt));
        dispatch(setUser(response.user));
        dispatch(setInLocalStorage('jwt', response.jwt));
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

/**
 * Refreshes user based on the jwt token we have.  This should always match the signed in user.
 */
export function refreshUser() {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    dispatch(setLoading(true));

    return getUserByJwt(jwt)
    .then(user => dispatch(setUser(user)))
    .then(dispatch(setLoading(false)));
  };
}

export function storeGroup(groupName) {
  return (dispatch, getState) => {
    const checklist = getState().checklist;
    const members = [getState().user.id];
    for (const id in checklist) {
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

export function getUserGroups() {
  return (dispatch, getState) => {
    const id = getState().user.id;
    return fetchUserGroups(id)
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
    dispatch(setLoading(true));
    console.log('creating event:', event);
    postEvent(event)
    .then((event) => {
      dispatch(setActiveEvent(event));
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
      dispatch(clearItemSelectionInList('friendsToInvite'));
      dispatch(clearItemSelectionInList('groupsToInvite'));
      return dispatch(updatePendingEvent(null));
    } else {
      return dispatch(updatePendingEvent({}));
    }
  };
}
