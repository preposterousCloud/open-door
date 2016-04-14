import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/styles.js';
import CreateGroup from './CreateGroup/CreateGroup.js';
import Group from './Group/Group.js';
import { makeClickableRow, makeListContainer } from '../../Shared/ComponentHelpers.js';
import { exitButton, enterButton } from '../../Shared/Buttons.js';
import { navTo } from '../../Shared/NavHelpers.js';
import { BackgroundImage } from '../../Shared/BackgroundImage';

const Groups = (props) => {
  const logGroup = (group) => {
    navTo(Group, group);
  };

  const GroupsListContainer = makeListContainer(makeClickableRow(logGroup, 'name'), ['user', 'Groups']);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedText}> GROUPS </Text>
        </View>
        <View style={styles.container}>
          <GroupsListContainer />
        </View>
        <NavBar
          title={ '' }
          leftButton={exitButton}
          rightButton={enterButton(CreateGroup)}
        />
      </View>
    </BackgroundImage>
  );
};

module.exports = Groups;
