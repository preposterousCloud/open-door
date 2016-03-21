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

const submitGroup = () => {
  const name = store.getState().groupName;
  allUsers();
  store.dispatch(actions.storeGroup(name));
}

const CreateGroup = class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    allUsers();
  }
  
  // CHANGE ONCE FRIENDS FEATURE IS IMPLEMENTED
  render() {
    const CreateGroupShowFriendsListContainer = common.makeListContainer(common.makeSelectableRow(checkCheckbox, getChecklist), ['allUsers']);
    const leftNavButton = {
      title: 'X',
      handler: cancelNewGroup,
    };
    const rightNavButton = {
      title: '✓',
      handler: submitGroup,
    };
    return (
      <View>
        <NavBar
          title={'Create Group'}
          leftButton={leftNavButton}
          rightButton={rightNavButton}
        />
        <CreateGroupName />
        <CreateGroupShowFriendsListContainer />
      </View>
    );
  }
};

module.exports = CreateGroup;
