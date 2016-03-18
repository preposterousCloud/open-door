import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';

import styles from '../../styles/Social/socialStyles.js';
import NavBar from '../Shared/NavBar.js';
import Groups from './Groups/Groups.js';
import Friends from './Friends/Friends.js';

const showFriends = () => {
  store.getState().navigation.navigator.push({
    component: Friends,
  })
}

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
  swipeRight: React.PropTypes.function,
};

module.exports = Social;
