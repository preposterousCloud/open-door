import React, { View, Text } from 'react-native';
import { connect } from 'react-redux'

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';

import styles from '../../../../styles/Social/socialStyles.js';
import NavBar from '../../../Shared/NavBar.js';
import CreateGroupName from './CreateGroupName.js';
import CreateGroupShowFriendsList from './CreateGroupShowFriendsList.js';
import { getAllUsers } from '../../../../sharedNative/actions/actions.js';

const allUsers = () => {
  store.dispatch(getAllUsers())
  .then((allUsers) => {
    console.log('allUsers', allUsers)
    return allUsers.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
      }
    })
  })
}

const cancelNewGroup = () => {
  store.getState().navigation.navigator.jumpBack();
};

const CreateGroup = (props) => {
  allUsers();
  console.log('INSIDE CREATE GROUP', props)
  const leftNavButton = {
    title: 'X',
    handler: cancelNewGroup,
  };
  
  // CHANGE ONCE FRIENDS FEATURE IS IMPLEMENTED
  const CreateGroupShowFriendsListContainer = connect(state => {
    return {
      users: state.allUsers,
    };
  })(CreateGroupShowFriendsList);

  return (
    <View>
      <NavBar
        title={props.groupName || 'Create Group'}
        leftButton={leftNavButton}
      />
      <CreateGroupName />
      <CreateGroupShowFriendsListContainer />
    </View>
  );
};

module.exports = CreateGroup;
