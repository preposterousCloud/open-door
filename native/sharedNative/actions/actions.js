const a = require('../ActionTypes');
import { postEvent, closeEvent, fetchAllUsers, getUser, postUser } from '../utils/api';

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

export function createEvent(event) {
  return {
    type: a.CREATE_EVENT,
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

export function liveUpdateGroupName(name) {
  return {
    type: a.SET_GROUPNAME_INPUT_DISP,
    groupName: name,
  }
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
        console.log('Log in user');
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
        console.log('Fetching ALL the Users');
        dispatch(setAllUsers(users));
        return users;
      }
      return false;
    });
  };
}

export function refreshUser() {
  console.log('>>>>>>>>>>Refreshing Users');
  return (dispatch, getState) => {
    const userId = getState().user.id;
    dispatch(setLoading(true));

    return getUser(userId)
    .then(user => dispatch(setUser(user)))
    .then(dispatch(setLoading(false)));
  };
}

export function toggleEvent(event) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    if (getState().user.currentEvent) {
      closeEvent(getState().user.currentEvent)
      .then((event) => {
        dispatch(setLoading(false));
        dispatch(setActiveEvent(null));
        dispatch(refreshUser());
      });
    } else {
      return postEvent(event)
      .then((event) => {
        dispatch(setActiveEvent(event));
        dispatch(setLoading(false));
        dispatch(refreshUser());
        return event;
      });
    }
  };
}
