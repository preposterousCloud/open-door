import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import friendsApi from '../../../sharedNative/utils/friends.js';
import { getAllUsers } from '../../../sharedNative/actions/actions.js';
import {
  exitButton,
  navTo,
  enterButton,
  arrayToDataSource,
  cancelButton,
  makeClickableRow,
  UserList,
  makeListContainer,
} from '../../Shared/Misc.js';

const AddFriends = (props) => {
  // Begin TextInput methods
  const something = () => {
    console.log('form submit!');
  };

  let userName;
  const updateUserName = newUserName => { userName = newUserName; };

  const cancelButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };

  const alertRequestSent = (user) => {
    Alert.alert(`add friend ${user.userName}?`, '', [
      cancelButton,
      { text: 'Add',
        onPress: () => store.dispatch(friendsApi.addFriend(user.id)),
        style: 'default',
      },
    ]);
  };
  // End TextInput methods

  const getAllUsersArray = () => {
    store.dispatch(getAllUsers())
    .then((allUsers) => {
      return allUsers.map((user) => {
        return {
          id: user.id,
          userName: user.userName,
        };
      });
    });
  };
  const allUsers = getAllUsersArray();

  const AddFriendsListContainer = connect(state => {
    const filterIds = state.user.friends ?
      state.user.friends.map(friend => friend.id).concat(state.user.id) : [];
    const targetUsers = state.allUsers.filter(targetUser => (filterIds.indexOf(targetUser.id) < 0));
    return {
      listComponent: UserList,
      rowComponent: makeClickableRow(alertRequestSent),
      listData: targetUsers,
      user: state.user,
    };
  })(UserList);

  return (
    <View>
      <NavBar
        title={ 'Add Friend' }
        leftButton={exitButton}
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
        onSubmitEditing={something}
      />
      <AddFriendsListContainer />
    </View>
  );
};

module.exports = AddFriends;
