import React from 'react-native';
import { connect } from 'react-redux';
const actions = require('../../sharedNative/actions/actions');
import Profile from './Profile';

const mapPropsToState = (state, ownProps) => {
  return {
    user: state.user,
  };
};
const mapDispatchToState = (dispatch, ownProps) => {
  return {
    updateUser: (updatedUserInfo) => {
      return dispatch(actions.updateUser(updatedUserInfo));
    },
  };
};

const ProfileContainer = connect(mapPropsToState, mapDispatchToState)(Profile);

module.exports = ProfileContainer;
