import styles from '../../styles/Feed/feedStyles.js';
import Feed from '../Feed/Feed.js';
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

const rightNavButton = {
  title: 'My Door',
  handler: scrollToSetDoor,
};

const Swiper = () => {
  const swiperRef = (
    <View style={styles.container}>
      <NavBar
        title={ 'Event Feed' }
        rightButton={rightNavButton}
      />
      <Feed />
    </View>
  );

  store.dispatch({
    type: 'SET_SCROLL_EVENT',
    data: swiperRef,
  });
  return swiperRef;
};

module.exports = Swiper;
