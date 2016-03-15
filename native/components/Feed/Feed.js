import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import NavBar from '../Shared/NavBar.js';
import SetDoor from '../Door/SetDoor.js';
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

const scrollToSetDoor = () => {
  store.dispatch({
    type: 'SET_FOCUS_EVENT',
    data: {
      user: 'Old Greg',
      doorStatus: 'CLOSED',
    },
  });
  store.getState().navigator.push({
    component: SetDoor,
  });
};

const rightNavButton = {
  title: 'My Door',
  handler: scrollToSetDoor,
};

const Feed = () => (
  <View style={styles.container}>
    <NavBar
      title={ 'Event Feed' }
      rightButton={rightNavButton}
    />
    <FeedList />
  </View>
);

module.exports = Feed;
