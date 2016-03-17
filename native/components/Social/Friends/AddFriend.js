import React, { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Social/socialStyles.js';
import friendsApi from '../../sharedNative/utils/friends.js';
import usersApi from '../../sharedNative/utils/users.js';

const Friends = (props) => {
  // const allUsers =
  const leftNavButton = {
    title: 'X',
    handler: store.getState().navigation.navigator.jumpBack,
  };
  const rightNavButton = {
    title: '+',
    handler: store.getState().navigation.navigator.jumpBack,
  };
  let userName;
  const updateUserName = newUserName => { userName = newUserName; };
  const addFriend = () => {
    const friend1id = store.getState().user.id;
    const friend2id = 4;
    friendsApi.createFriendship(friend1id, friend2id);
  };

  return (
    <View>
      <NavBar
        title={ 'Add Friend' }
        leftButton={leftNavButton}
        rightButton={rightNavButton}
      />
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        maxLength={16}
        placeholder={'userName'}
        value={userName}
        style={styles.userInput}
        returnKeyType={'go'}
        onChangeText={updateUserName}
        onSubmitEditing={loginWithUser}
      />
    </View>
  );
};

module.exports = Friends;
