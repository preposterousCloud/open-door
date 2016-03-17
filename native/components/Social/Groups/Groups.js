import React, { View, Text } from 'react-native';
import { connect } from 'react-redux'

import { reducer, store } from '../../../sharedNative/reducers/reducers.js';

import styles from '../../../styles/Social/socialStyles.js';
import NavBar from '../../Shared/NavBar.js';
import CreateGroup from './CreateGroup/CreateGroup.js';
import GroupsList from './GroupsList.js';

const closeGroups = () => {
  store.getState().navigation.navigator.jumpBack();
};

const addGroup = () => {
  store.getState().navigation.navigator.push({
    component: CreateGroup,
  });
};

const Groups = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: closeGroups,
  };

  const rightNavButton = {
    title: '+',
    handler: addGroup,
  };

  const GroupsListContainer = connect(state => {
    return {
      groups: state.user.Groups,
    };
  })(GroupsList);

  return (
    <View>
      <NavBar
        title={ 'Groups' }
        leftButton={leftNavButton}
        rightButton={rightNavButton}
      />
      <GroupsListContainer />
    </View>
  );
};

module.exports = Groups;
