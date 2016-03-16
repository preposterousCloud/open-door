const a = require('../ActionTypes');
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import { postEvent } from '../utils/api';

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

export function setLoading(loadingState) {
  console.log('set loading', loadingState)
  return {
    type: a.TOGGLE_LOADING,
    data: loadingState,
  };
}

export function toggleEvent(event) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (store.getState().currentEvent) {
      // Async close event
      dispatch(setLoading(false));
      return dispatch(setActiveEvent(null));
    }
    return postEvent(event)
    .then((event) => {
      dispatch(setActiveEvent(event));
      dispatch(setLoading(false));
      return event;
    });
  };
}
