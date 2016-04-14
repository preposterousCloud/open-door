import React, { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions.js');
import { cancelButton } from '../../../Shared/Buttons';
import { makeListContainer, makeSelectableRow } from '../../../Shared/ComponentHelpers.js';
import styles from '../../../../styles/styles.js';
import NavBar from '../../../Shared/NavBar.js';
import CreateGroupName from './CreateGroupName.js';
import { BackgroundImage } from '../../../Shared/BackgroundImage';
import { exitButton, saveButton } from '../../../Shared/Buttons.js';

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

const CreateGroup = class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };
    this.updateGroupName = this.updateGroupName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  updateGroupName(newVal) {
    this.setState({
      groupName: newVal,
    });
  }
  onSubmit() {
    if (this.state.groupName) {
      store.dispatch(actions.storeGroup(this.state.groupName))
      .then(() => {
        store.getState().navigation.navigator.pop();
      });
    } else {
      const groupNames = ['Teen Titans', 'Captian\'s Crew', 'Lazy Leopards', 'Penguin Pals'];
      Alert.alert(
        'Your group needs a name!',
        `How about ${groupNames[Math.floor(Math.random() * groupNames.length)]}?`,
        [cancelButton]);
    }
  }
  componentDidMount() {
    getFriends();
  }
  componentWillUnmount() {
    // Clears out the existing checkboxes and resets state
    createChecklist();
  }
  render() {
    const CreateGroupShowFriendsListContainer = makeListContainer(
      makeSelectableRow(checkCheckbox, getChecklist),
      ['user', 'friends']
    );
    const rightNavButton = {
      title: '✓',
      handler: this.onSubmit,
    };
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedText}> CREATE GROUP </Text>
          </View>
          <View style={[styles.container, { marginHorizontal: 20 }]}>
            <CreateGroupName onUpdate={this.updateGroupName} onSubmit={this.onSubmit} />
            <CreateGroupShowFriendsListContainer />
          </View>
          <NavBar
            title={''}
            leftButton={exitButton}
            rightButton={saveButton(this.onSubmit)}
          />
        </View>
      </BackgroundImage>
    );
  }
};

module.exports = CreateGroup;
