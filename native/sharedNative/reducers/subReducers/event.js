import actions from '../../ActionTypes';

export function currentEvent(state = {}, action) {
  switch (action.type) {
    case actions.SET_ACTIVE_EVENT:
      return action.data;
    default:
      return state;
  }
}

