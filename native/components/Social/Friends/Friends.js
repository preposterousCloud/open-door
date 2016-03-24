import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AddFriends from './AddFriends.js';
import {
  exitButton,
  enterButton,
  makeClickableRow,
  makeListContainer,
} from '../../Shared/Misc.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';

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
        rightButton={enterButton(AddFriends, props.user)}
      />
      <ScrollableTabView
        locked={true}
        tabBarUnderlineColor={'#227DF4'}
        tabBarActiveTextColor={'#227DF4'}
        tabBarBackgroundColor={'#FFF'}
        style={styles.tabBar}
      >
        <FriendsListContainer tabLabel="Friends List" />
        <FriendsListContainer tabLabel="Test Tab" />
      </ScrollableTabView>
    </View>
  );
};

Friends.propTypes = {
  user: React.PropTypes.object,
};

module.exports = Friends;
