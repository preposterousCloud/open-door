const actions = require('../../ActionTypes');

export function currentEvent(state = null, action) {
  switch (action.type) {
    case actions.SET_ACTIVE_EVENT:
      return action.data;
    default:
      return state;
  }
}
