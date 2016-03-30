import React from 'react-native';
import { connect } from 'react-redux';
const actions = require('../../sharedNative/actions/actions');
import SetDoor from './SetDoor';

const mapPropsToState = (state, ownProps) => {
  return {
    user: state.user,
    currentEvent: state.user.currentEvent,
    swipeLeft: ownProps.swipeLeft,
    app: state.app,
  };
};

const mapDispatchToState = (dispatch, ownProps) => {
  return {
    closeDoor: (event) => dispatch(actions.closeDoor(event)),
    onEventSubmit: (eventObj) => {
      dispatch(actions.createEvent(eventObj));
    },
    onEventUpdate: (eventObj) => {
      dispatch(actions.updateEvent(eventObj));
    },
  };
};

const SetDoorContainer = connect(mapPropsToState, mapDispatchToState)(SetDoor);

module.exports = SetDoorContainer;
