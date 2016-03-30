import React, { View, Text, TouchableOpacity, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AddFriends from './AddFriends.js';
import { confirmFriend, rejectFriend } from '../../../sharedNative/actions/actions.js';
import { makeClickableRow, makeListContainer } from '../../Shared/ComponentHelpers.js';
import { exitButton, enterButton } from '../../Shared/Buttons.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';

const Friends = (props) => {
  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}. Req: `, store.getState());
  };

  const respondToReq = (target) => {
    const userReqIds = store.getState().pendingRequests.sent.map(user => user.id);
    const userReqs = store.getState().pendingRequests;
    Alert.alert(`How do you wanna respond to ${target.userName}?`, '', [
      { text: 'Reject',
        onPress: () => store.dispatch(rejectFriend(target.id)),
        style: 'destructive',
      },
      { text: 'Add Friend',
        onPress: () => store.dispatch(confirmFriend(target.id)),
        style: 'default',
      },
    ]);
  };

  const reqIds = store.getState().pendingRequests.received.map(user => user.id);
  const reqNames = store.getState().pendingRequests.received.map(user => user.userName);

  const FriendsListContainer = makeListContainer(
    makeClickableRow(logUser),
    ['user', 'friends']);
  const FriendRequestsContainer = makeListContainer(
    makeClickableRow(respondToReq, reqNames, reqIds, 'blue'),
    ['pendingRequests', 'received']
  );
  const requestCount = store.getState().pendingRequests.received.length;
  return (
    <View>
      <NavBar
        title={ 'Friends' }
        leftButton={exitButton}
        rightButton={enterButton(AddFriends, props.user)}
      />
      <ScrollableTabView
        locked
        tabBarUnderlineColor={'#227DF4'}
        tabBarActiveTextColor={'#227DF4'}
        tabBarBackgroundColor={'#FFF'}
        style={styles.tabBar}
      >
        <FriendsListContainer tabLabel="Friends List" />
        <FriendRequestsContainer
          tabLabel={`Requests ${requestCount ? `(${requestCount})` : ''}`}
        />
      </ScrollableTabView>
    </View>
  );
};

Friends.propTypes = {
  user: React.PropTypes.object,
};

module.exports = Friends;
