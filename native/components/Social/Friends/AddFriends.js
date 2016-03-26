import React, { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import FilterTextInput from '../../Shared/FilterTextInput.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import { requestFriend } from '../../../sharedNative/actions/actions.js';
import { makeClickableRow, UserList } from '../../Shared/Misc.js';
import { exitButton, cancelButton } from '../../Shared/Buttons.js';
import { getAllUsersArray } from '../../Shared/HelperFunctions.js';
import styles from '../../../styles/Social/socialStyles.js';

const AddFriends = (props) => {
  const cancelButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };

  const alertRequestSent = (target) => {
    const userReqIds = store.getState().pendingRequests.sent.map(user => user.id);
    const userReqs = store.getState().pendingRequests;
    if (userReqIds.length > 0 && userReqIds.indexOf(target.id) >= 0) {
      Alert.alert(`You already sent a friend request to ${target.userName}!`);
    } else {
      Alert.alert(`Send a friend request to ${target.userName}?`, '', [
        cancelButton,
        { text: 'Add',
          onPress: () => store.dispatch(requestFriend(target.id)),
          style: 'default',
        },
      ]);
    }
  };

  const allUsers = getAllUsersArray();

  const AddFriendsListContainer = connect(state => {
    const re = new RegExp(state.filterText, 'ig');
    const filterConfirmedFriends = state.user.friends ?
      state.user.friends.map(friend => friend.id).concat(state.user.id) : [state.user.id];
    const filterId = state.pendingRequests.received ?
      state.pendingRequests.received.map(req => req.id)
      .concat(filterConfirmedFriends) : [state.user.id];
    const targetUsers = state.allUsers.filter(targetUser => (
      filterId.indexOf(targetUser.id) < 0 && targetUser.userName.match(re)
    ));
    const alreadySent = state.pendingRequests.sent.map(user => user.id);
    return {
      listComponent: UserList,
      rowComponent: makeClickableRow(alertRequestSent, 'userName', alreadySent, 'grey'),
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
