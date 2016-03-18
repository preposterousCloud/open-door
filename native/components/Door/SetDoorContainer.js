
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

const SetDoorContainer = connect(mapPropsToState, mapDispatchToState)(SetDoor);

SetDoorContainer.propTypes = {
  swipeLeft: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  onDoorToggle: React.PropTypes.func.isRequired,
};

module.exports = SetDoorContainer;
