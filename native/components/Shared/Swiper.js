import styles from '../../styles/Feed/feedStyles.js';
import Feed from '../Feed/Feed.js';
import Profile from '../Profile/Profile.js';
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

const _goToSetDoor = () => {
  store.getState().swiperRef.scrollTo(1);
};

const _goToProfile = () => {
  store.getState().swiperRef.scrollTo(-1);
};

const rightNavButton = {
  title: 'My Door',
  handler: scrollToSetDoor,
};

const leftNavButton = {
  title: 'Profile',
  handler: _goToProfile,
};

const SwiperBase = () => (
  <View style={styles.container}>
    <Swiper
      index={1}
      showsButtons={false}
      loop={false}
      showsPagination={false}
    >
      <Profile />
      <Feed />
      <SetDoor />
    </Swiper>
  </View>
);

module.exports = SwiperBase;
