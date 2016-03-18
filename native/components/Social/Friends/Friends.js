import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import AddFriends from './AddFriends.js';

const Friends = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: store.getState().navigation.navigator.pop,
  };

  const navToAddFriends = () => {
    store.getState().navigation.navigator.push({ component: AddFriends });
  };

  const rightNavButton = {
    title: '+',
    handler: navToAddFriends,
  };

  const convertArrayToDatasource = (array) => {
    array = array || [];
    return (new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2 }
      ).cloneWithRows(array)
    );
  };

  const arrayToDataSource = (array) => {
    array = array || [];
    return (new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2 }
      ).cloneWithRows(array)
    );
  };

  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}`);
  };

  const FriendsListRow = (user) => {
    const logThisUser = logUser.bind(null, user);

    return (
      <View>
        <TouchableOpacity
          onPress={logThisUser}
          style={styles.group}
        >
          <View style={styles.listEntryView}>
            <Text>{user.userName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const FriendsList = (props) => (
    <View style={styles.container}>
      <ListView
        dataSource={arrayToDataSource(props.friends)}
        renderRow={FriendsListRow}
        style={styles.listView}
      />
    </View>
  );

  FriendsList.propTypes = {
    friends: React.PropTypes.array,
  };

  const FriendsListContainer = connect(state => {
    return {
      friends: state.user.friends,
    };
  })(FriendsList);

  return (
    <View>
      <NavBar
        title={ 'Friends' }
        leftButton={leftNavButton}
        rightButton={rightNavButton}
      />
      <FriendsListContainer />
    </View>
  );
};

module.exports = Friends;
