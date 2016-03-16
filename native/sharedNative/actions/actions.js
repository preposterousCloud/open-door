const actions = require('../ActionTypes');

export function setActiveEvent(event) {
  return {
    type: actions.SET_ACTIVE_EVENT,
    data: event,
  };
}

export function createEvent(event) {
  return {
    type: actions.CREATE_EVENT,
    data: event,
  };
}
