import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import CreateGroup from './CreateGroup/CreateGroup.js';
import Group from './Group/Group.js';
import {
  exitButton,
  enterButton,
  makeClickableRow,
  makeListContainer,
  navTo,
} from '../../Shared/Misc.js';

const Groups = (props) => {
  const logGroup = (group) => {
    console.log(`You clicked on ${group.name}, id:${group.id}`);
    navTo(Group, group);
  };

  const GroupsListContainer = makeListContainer(makeClickableRow(logGroup, 'name'), ['user', 'Groups']);

  return (
    <View>
      <NavBar
        title={ 'Groups' }
        leftButton={exitButton}
        rightButton={enterButton(CreateGroup)}
      />
      <GroupsListContainer />
    </View>
  );
};

module.exports = Groups;
