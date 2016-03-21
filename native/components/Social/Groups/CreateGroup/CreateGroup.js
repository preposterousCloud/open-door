import React, { View, Text } from 'react-native';
import { connect } from 'react-redux'

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions.js')

import common from '../../../Shared/Misc.js'
import styles from '../../../../styles/Social/socialStyles.js';
import NavBar from '../../../Shared/NavBar.js';
import CreateGroupName from './CreateGroupName.js';
import { getAllUsers } from '../../../../sharedNative/actions/actions.js';

const allUsers = () => {
  store.dispatch(getAllUsers())
  .then((allUsers) => {
    createChecklist(allUsers);
  })
}

const cancelNewGroup = () => {
  store.getState().navigation.navigator.pop();
};

const createChecklist = (users) => {
  let userChecklist = {};
  users.forEach((user) => {
    userChecklist[user.id] = false;
  });
  store.dispatch(actions.setUserChecklist(userChecklist));
}

const checkCheckbox = (user) => {
  const oldList = store.getState().checklist;
  store.dispatch(actions.markCheckbox(user.id, oldList));
  const newList = store.getState().checklist;
  return newList;
}

const getChecklist = () => {
  return store.getState().checklist;
}

const CreateGroup = (props) => {
  allUsers();
  const leftNavButton = {
    title: 'X',
    handler: cancelNewGroup,
  };
  
  // CHANGE ONCE FRIENDS FEATURE IS IMPLEMENTED
  const CreateGroupShowFriendsListContainer = common.makeListContainer(common.makeSelectableRow(checkCheckbox, getChecklist), ['allUsers']);

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
