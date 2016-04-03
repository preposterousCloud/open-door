const a = require('../ActionTypes');
import * as api from '../utils/api';

const localStore = require('react-native-simple-store');
const Contacts = require('react-native-contacts');

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

export function setUsersInContacts(contactMap) {
  return {
    type: a.SET_USERS_IN_CONTACTS,
    contactMap,
  };
}

export function removeFriendFromUser(removalId) {
  return {
    type: a.REMOVE_FRIEND_FROM_USER,
    removalId,
  };
}

/** *****************************************************
 * Synchronous Action Creators
 * ************************************************** */
export function sortPendingFriendRequests(user) {
  if (user) {
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
            profilePictureUri: req.profilePictureUri,
          });
        } else {
          sortedReqs.received.push({
            id: req.id,
            userName: req.userName,
            profilePictureUri: req.profilePictureUri,
          });
        }
      });
      return dispatch(setPendingFriendRequests(sortedReqs));
    };
  }
}

export function getAllContacts(cb) {
  return Contacts.getAll((err, contacts) => {
    if (err && err.type === 'permissionDenied') {
      console.error('Nope!');
    } else {
      cb(contacts);
    }
  });
}
/** *****************************************************
 * Async Thunk Action Creators
 * ************************************************** */
export function createUser(userName, pw, phone) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const jwt = getState().app.jwt;
    return api.postUser(userName, pw, phone, jwt)
    .then(response => {
      dispatch(setJwt(response.jwt));
      dispatch(setUser(response.user));
      dispatch(setInLocalStorage('jwt', response.jwt));
      return response.user;
    })
    .catch(err => ({ err }));
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

export function attemptLogin(userName, pw, phone) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return api.loginUser(userName, pw, phone)
    .then(response => {
      dispatch(setLoading(false));
      dispatch(setJwt(response.jwt));
      dispatch(setUser(response.user));
      dispatch(setInLocalStorage('jwt', response.jwt));
      return response;
    })
    .catch(err => {
      // We eat the actual error and return it as a normal object;
      return { err };
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

export function updateUser(newUserInfo) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const jwt = getState().app.jwt;
    return api.updateUser(newUserInfo, jwt)
    .then(user => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
      return user;
    })
    .catch(err => {
      return { err };
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

export function getAllUsersWithoutContacts() {
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

export function getAllUsers() {
  return (dispatch, getState) => {
    const contactNumbers = [];
    const localContactMap = {};
    const importContacts = getAllContacts(addressBook => {
      const usersAndContacts = addressBook.forEach(contact => {
        contact.phoneNumbers.forEach((phone) => {
          const sanitizedPhone = phone.number
            .replace(/\D|1(?=\d{9})/igm, '').replace(/1(?=\d{9})/igm, '');
          contactNumbers.push(sanitizedPhone);
          localContactMap[sanitizedPhone] = `${contact.givenName} ${contact.familyName}`;
        });
      });
      return api.usersExistByContact(contactNumbers, getState().app.jwt)
      .then(matchingContacts => {
        const contactsMap = {};
        matchingContacts.forEach(contact => {
          contact.localName = localContactMap[contact.phone];
          contactsMap[contact.id] = contact.localName;
        });
        dispatch(setUsersInContacts(contactsMap));
        dispatch(setAllUsers(matchingContacts));
        return matchingContacts;
      });
    });
  };
}

export const requestFriend = (toId) => {
  return (dispatch, getState) => {
    return api.requestFriend(getState().user.id, toId, getState().app.jwt)
    .then(response => {
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
      return response;
    })
    .then(() => {
      dispatch(refreshUser());
      dispatch(getUserEvents());
    })
    .catch(catchErr);
  };
};

export const rejectFriend = (toId) => {
  return (dispatch, getState) => {
    return api.rejectFriend(getState().user.id, toId, getState().app.jwt)
    .then(response => {
      return response;
    })
    .then(() => dispatch(refreshUser()))
    .catch(catchErr);
  };
};

export function removeFriendship(userToUnfriendId) {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    return api.removeFriendship(userToUnfriendId, jwt)
    .then(removedUserId => {
      if (removedUserId) {
        return dispatch(removeFriendFromUser(removedUserId));
      }
      return false;
    });
  };
}

export function storeGroup(groupName) {
  return (dispatch, getState) => {
    const jwt = getState().app.jwt;
    const checklist = getState().checklist;
    const members = [getState().user.id];
    for (const id in checklist) {
      if (checklist[id]) {members.push(+id);}
    }
    return api.postGroup(groupName, members, jwt)
    .then(user => {
      if (user) {
        dispatch(refreshUser());
        return true;
      }
      return false;
    });
  };
}

export function updateGroupPic(groupId, encodedGroupPic) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const jwt = getState().app.jwt;
    return api.updateGroupPic(groupId, encodedGroupPic, jwt)
    .then(newPicLink => {
      // TODO - We should update the group object
      dispatch(setLoading(false));
      return newPicLink;
    })
    .catch(err => null);
  };
}

export function addFriendToGroup(groupId, userId) {
  return (dispatch, getState) => {
    const myId = getState().user.id;
    const jwt = getState().app.jwt;
    return api.addToGroup(groupId, userId, myId, jwt)
    .then(group => {
      if (group) {
        dispatch(setUserGroupMembers(group.Users));
        return group;
      }
      return false;
    });
  };
}

export function removeFromGroup(groupId, userToRemoveId) {
  return (dispatch, getState) => {
    const myId = getState().user.id;
    const jwt = getState().app.jwt;
    return api.removeFromGroup(groupId, userToRemoveId, myId, jwt)
    .then(group => {
      if (group) {
        dispatch(setUserGroupMembers(group.Users));
        return group;
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
