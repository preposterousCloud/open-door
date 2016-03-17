import React, { View, Text } from 'react-native';
import { connect } from 'react-redux'

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';

import styles from '../../../../styles/Social/socialStyles.js';
import NavBar from '../../../Shared/NavBar.js';
import CreateGroupShowFriendsList from './CreateGroupShowFriendsList.js';

const cancelNewGroup = () => {
  store.getState().navigation.navigator.jumpBack();
};

const CreateGroup = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: cancelNewGroup,
  };

  // CHANGE FOR API ROUTE
  const CreateGroupShowFriendsListContainer = connect(state => {
    return {
      groups: state.user.Groups,
    };
  })(CreateGroupShowFriendsList);

  return (
    <View>
      <NavBar
        title={ 'Create Group' }
        leftButton={leftNavButton}
      />
      <CreateGroupShowFriendsListContainer />
    </View>
  );
};

module.exports = CreateGroup;
