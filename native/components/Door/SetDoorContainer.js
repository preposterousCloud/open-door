
import React from 'react-native';
import { connect } from 'react-redux';

const actions = require('../../sharedNative/actions/actions');
import SetDoor from './SetDoor';

const mapPropsToState = (state, ownProps) => {
  return {
    user: state.user,
    swipeLeft: ownProps.swipeLeft,
    app: state.app,
  };
};

const mapDispatchToState = (dispatch, ownProps) => {
  return {
    onDoorToggle: (event) => {
      dispatch(actions.toggleEvent(event));
    },
    onEventSettingsChange: (eventProp, value) => {
      const obj = {};
      obj[eventProp] = value;
      dispatch(actions.updatePendingEvent(obj));
    },
    // NOTE: eventObj is an open-door "Event" not a computer event (eg. mouse click)
    onEventSubmit: (eventObj) => {
      dispatch(actions.createEvent(eventObj));
    },
  };
};

const SetDoorContainer = connect(mapPropsToState, mapDispatchToState)(SetDoor);

module.exports = SetDoorContainer;
