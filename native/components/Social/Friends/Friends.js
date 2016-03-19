import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import AddFriends from './AddFriends.js';
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

const Friends = (props) => {
  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}`);
  };

  const FriendsListContainer = makeListContainer(makeClickableRow(logUser), ['user', 'friends']);

  return (
    <View>
      <NavBar
        title={ 'Friends' }
        leftButton={exitButton}
        rightButton={enterButton(AddFriends)}
      />
      <FriendsListContainer />
    </View>
  );
};

module.exports = Friends;
