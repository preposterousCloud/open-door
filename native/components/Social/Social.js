import React, { View, Text, TouchableOpacity } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import Groups from './Groups/Groups.js';
import Friends from './Friends/Friends.js';
import styles from '../../styles/styles.js';
import { RightArrow, PersonAddOutline, GroupsOutline } from '../Shared/Icons';

const groupsNav = () => {
  store.getState().navigation.navigator.push({
    component: Groups,
  });
};

const Social = (props) => {
  const rightNavButton = (
      <TouchableOpacity onPress={props.swipeRight}>
        <RightArrow style={{ size: 40, color: 'white', alignSelf: 'flex-start' }} />
      </TouchableOpacity>
    );
  const showFriends = () => {
    store.getState().navigation.navigator.push({
      component: Friends,
      passProps: {
        user: props.user,
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedText}> YOUR WORLD </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={showFriends}
          style={styles.socialF}
        >
          <PersonAddOutline style={{ size: 60, color: 'white' }} />
          <Text style={styles.socialText}>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={groupsNav}
          style={styles.socialG}
        >
          <GroupsOutline style={{ size: 60, color: 'white' }} />
          <Text style={styles.socialText}>GROUPS</Text>
        </TouchableOpacity>
      </View>
      <NavBar
        title={ '' }
        rightButton={rightNavButton}
      />
  </View>
  );
};

Social.propTypes = {
  swipeRight: React.PropTypes.func,
  user: React.PropTypes.object,
};

module.exports = Social;
