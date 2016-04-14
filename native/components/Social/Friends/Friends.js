import React, { View, Text, TouchableOpacity, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers';
import NavBar from '../../Shared/NavBar';
import * as actions from '../../../sharedNative/actions/actions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AddFriends from './AddFriends';
import { confirmFriend, rejectFriend } from '../../../sharedNative/actions/actions';
import { makeClickableRow, makeListContainer } from '../../Shared/ComponentHelpers';
import CirclePic from '../../Shared/CirclePic';
import { exitButton, enterButton } from '../../Shared/Buttons';
import styles from '../../../styles/styles';
import { BackgroundImage } from '../../Shared/BackgroundImage';
import Swipeout from 'react-native-swipeout';
import { UserRow } from '../../Shared/UserRow';

const FriendListRow = (props) => {
  const removeFriendButton = [{
    text: 'Remove',
    onPress: () => store.dispatch(actions.removeFriendship(props.id)),
  }];
  return (
    <Swipeout right={removeFriendButton} backgroundColor={'transparent'}>
      <UserRow {...props} />
    </Swipeout>
  );
};

FriendListRow.propTypes = { id: React.PropTypes.number };

const Friends = (props) => {
  const respondToReq = (target) => {
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
  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}. Req: `, store.getState());
  };

  const FriendRequestRow = (props) => {
    return (
      <TouchableOpacity onPress={respondToReq.bind(null, props)}>
        <UserRow {...props} />
      </TouchableOpacity>
    );
  };
  const FriendsListContainer = makeListContainer(
    FriendListRow,
    ['user', 'friends']
  );
  const FriendRequestsContainer = makeListContainer(
    FriendRequestRow,
    ['pendingRequests', 'received']
  );
  const requestCount = store.getState().pendingRequests.received.length;
  const ExitButton = () => exitButton;
  const AddFriendsButton = () => enterButton(AddFriends, props.user);
  return (
    <BackgroundImage source={require('../../../static/bg.jpg')}>
      <View style={styles.container}>
        <View style = {styles.feedHeader}>
          <Text style={styles.feedText}> FRIENDS </Text>
        </View>
        <View style={styles.container}>
          <ScrollableTabView
            locked
            tabBarUnderlineColor={'#FFF'}
            tabBarActiveTextColor={'#FFF'}
            tabBarBackgroundColor={'transparent'}
          >
            {/* I removed this style from ScrollableTabView style={styles.tabBar} */}
            <View tabLabel="Friends" style={{ height: 490 }}>
              <FriendsListContainer />
            </View>
            <View tabLabel={`Requests ${requestCount || ''}`} style={{ height: 490 }}>
              <FriendRequestsContainer />
            </View>
          </ScrollableTabView>
        </View>
      </View>
      <View style={styles.bottomNav} >
        <ExitButton />
        <Text style={styles.navbarTitle}>{''}</Text>
        <AddFriendsButton />
      </View>
    </BackgroundImage>
  );
};
//
// <NavBar
// leftButton={exitButton}
// rightButton={enterButton(AddFriends, props.user)}
// tintColor={ 'transparent' }
// />
//
Friends.propTypes = {
  user: React.PropTypes.object,
};

module.exports = Friends;
