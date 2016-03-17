import React, { View, Text, TouchableOpacity } from 'react-native';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import AddFriends from './AddFriend.js';

const Friends = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: store.getState().navigation.navigator.jumpBack,
  };

  const navToAddFriends = () => {
    store.getState().navigation.navigator.push({ component: Friends });
  };

  const rightNavButton = {
    title: '+',
    handler: navToAddFriends,
  };

  return (
    <View>
      <NavBar
        title={ 'Friends' }
        leftButton={leftNavButton}
        rightButton={rightNavButton}
      />
      <Text>Friends List Here</Text>
    </View>
  );
};

module.exports = Friends;
