
import React from 'react-native';
import { connect } from 'react-redux';

const actions = require('../../sharedNative/actions/actions');
import SetDoor from './SetDoor';

const mapPropsToState = (state, ownProps) => {
  return {
    user: state.user,
    swipeLeft: ownProps.swipeLeft,
  };
};

const mapDispatchToState = (dispatch, ownProps) => {
  return {
    onDoorToggle: (event) => {
      dispatch(actions.toggleEvent(event));
    },
  };
};

const SetDoorLink = connect(mapPropsToState, mapDispatchToState)(SetDoor);

SetDoorLink.propTypes = {
  swipeLeft: React.PropTypes.func,
  user: React.PropTypes.object,
  onDoorToggle: React.PropTypes.func,
};

module.exports = SetDoorLink;
