import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import NavBar from '../Shared/NavBar.js';
import SetDoor from '../Door/SetDoor.js';
import Profile from '../Profile/Profile.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
  ScrollView,
 } from 'react-native';

import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';

const Feed = (props) => {
  const rightNavButton = {
    title: 'My Door',
    handler: props.swipeRight,
  };

  const leftNavButton = {
    title: 'Profile',
    handler: props.swipeLeft,
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={store.getState().user.userName}
        rightButton={rightNavButton}
        leftButton={leftNavButton}
      />
      <FeedList />
    </View>
  );
};

Feed.propTypes = {
  swipeRight: React.PropTypes.function,
  swipeLeft: React.PropTypes.function,
};

module.exports = Feed;
