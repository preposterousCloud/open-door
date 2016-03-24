import React, { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import FilterTextInput from '../../Shared/FilterTextInput.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import friendsApi from '../../../sharedNative/utils/friends.js';
import {
  exitButton,
  cancelButton,
  makeClickableRow,
  UserList,
  getAllUsersArray,
} from '../../Shared/Misc.js';
import styles from '../../../styles/Social/socialStyles.js';

const AddFriends = (props) => {
  const cancelButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };

  const alertRequestSent = (user) => {
    Alert.alert(`Send a friend request to ${user.userName}?`, '', [
      cancelButton,
      { text: 'Add',
        onPress: () => store.dispatch(friendsApi.addFriend(user.id)),
        style: 'default',
      },
    ]);
  };

  const allUsers = getAllUsersArray();

  const AddFriendsListContainer = connect(state => {
    const re = new RegExp(state.filterText, 'ig');
    const filterIds = state.user.friends ?
      state.user.friends.map(friend => friend.id).concat(state.user.id) : [];
    const filterReqs = state.user.requests ?
      state.user.requests.map(req => {
        if (req.sender) {
          return req.id;
        }
        filterIds.push(req.id);
      }) : [];
    const targetUsers = state.allUsers.filter(targetUser => (
      filterIds.indexOf(targetUser.id) < 0 && targetUser.userName.match(re)
    ));
    return {
      listComponent: UserList,
      rowComponent: makeClickableRow(alertRequestSent, 'userName', filterReqs),
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
      <FilterTextInput />
      <AddFriendsListContainer />
    </View>
  );
};

module.exports = AddFriends;
