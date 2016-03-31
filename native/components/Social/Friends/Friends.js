import React, { View, Text, TouchableOpacity, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers';
import NavBar from '../../Shared/NavBar';
const actions = require('../../../sharedNative/actions/actions');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AddFriends from './AddFriends';
import { confirmFriend, rejectFriend } from '../../../sharedNative/actions/actions';
import { makeClickableRow, makeListContainer } from '../../Shared/ComponentHelpers';
import CirclePic from '../../Shared/CirclePic';
import { exitButton, enterButton } from '../../Shared/Buttons';
import styles from '../../../styles/styles';
import { BackgroundImage } from '../../Shared/BackgroundImage';
import NavigationBar from 'react-native-navbar';

const FriendRow = (props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <CirclePic source={{ uri: props.user.profilePictureUri }}
        size={40}
        style={{ flex: 5 }}
      />
      <Text style={styles.feedText}>{props.user.userName}</Text>
    </View>
  );
};
FriendRow.propTypes = { user: React.PropTypes.object };



let Friends = (props) => {
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
  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}. Req: `, store.getState());
  };
  const reqIds = store.getState().pendingRequests.received.map(user => user.id);
  const reqNames = store.getState().pendingRequests.received.map(user => user.userName);

  const FriendsListContainer = makeListContainer(
    makeClickableRow(logUser, null, null, null, actions.removeFriendship),
    ['user', 'friends'], FriendRow
  );
  const FriendRequestsContainer = makeListContainer(
    makeClickableRow(respondToReq, reqNames, reqIds, 'blue'),
    ['pendingRequests', 'received']
  );
  const requestCount = store.getState().pendingRequests.received.length;
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
            <View tabLabel="Friends List" >
              <FriendsListContainer />
            </View>
            <View tabLabel={`Requests ${requestCount ? `(${requestCount})` : ''}`}>
              <FriendRequestsContainer />
            </View>
          </ScrollableTabView>
        </View>
      <NavigationBar
        title={ '' }
        leftButton={exitButton}
        rightButton={enterButton(AddFriends, props.user)}
        tintColor={ 'transparent' }
        style={styles.feedNavBar}
      />
      </View>
    </BackgroundImage>
  );
};

Friends.propTypes = {
  user: React.PropTypes.object,
};

module.exports = Friends;
