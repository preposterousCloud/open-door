import React, { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions.js');
import { cancelButton } from '../../../Shared/Buttons';
import { makeListContainer, makeSelectableRow } from '../../../Shared/ComponentHelpers.js';
import styles from '../../../../styles/styles.js';
import NavBar from '../../../Shared/NavBar.js';
import CreateGroupName from './CreateGroupName.js';

const cancelNewGroup = () => {
  store.getState().navigation.navigator.pop();
};

const createChecklist = (users = []) => {
  const userChecklist = {};
  users.forEach((user) => {
    userChecklist[user.id] = false;
  });
  store.dispatch(actions.setUserChecklist(userChecklist));
};

const getFriends = () => {
  const friends = store.getState().user.friends;
  createChecklist(friends);
};

const checkCheckbox = (user) => {
  const oldList = store.getState().checklist;
  store.dispatch(actions.markCheckbox(user.id, oldList));
  const newList = store.getState().checklist;
  return newList;
};

const getChecklist = () => {
  return store.getState().checklist;
};

const submitGroup = () => {
  const name = store.getState().groupName;
  if (name) {
    store.dispatch(actions.storeGroup(name))
    .then(() => {
      getFriends();
    });
  } else {
    const groupNames = ['Teen Titans', 'Captian\'s Crew', 'Lazy Leopards', 'Penguin Pals'];
    Alert.alert(
      'Your group needs a name!',
      `How about ${groupNames[Math.floor(Math.random() * groupNames.length)]}?`,
      [cancelButton]);
  }
};

const CreateGroup = class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getFriends();
  }

  render() {
    const CreateGroupShowFriendsListContainer = makeListContainer(
      makeSelectableRow(checkCheckbox, getChecklist),
      ['user', 'friends']
    );
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
