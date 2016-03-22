import React, { View, Text, TouchableOpacity } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import Groups from './Groups/Groups.js';
import Friends from './Friends/Friends.js';
import styles from '../../styles/Social/socialStyles.js';

const groupsNav = () => {
  store.getState().navigation.navigator.push({
    component: Groups,
  });
};

const Social = (props) => {
  const rightNavButton = {
    title: '>',
    handler: props.swipeRight,
  };
  const showFriends = () => {
    store.getState().navigation.navigator.push({
      component: Friends,
      passProps: {
        user: props.user,
      },
    });
  };
  return (
    <View>
      <NavBar
        title={ 'Social' }
        rightButton={rightNavButton}
      />
    <View>
      <TouchableOpacity
        onPress={showFriends}
        style={styles.socialF}
      >
        <Text>FRIENDS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={groupsNav}
        style={styles.socialG}
      >
        <Text>GROUPS</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

Social.propTypes = {
  swipeRight: React.PropTypes.func,
  user: React.PropTypes.object,
};

module.exports = Social;
