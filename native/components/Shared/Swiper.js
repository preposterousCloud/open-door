import styles from '../../styles/Feed/feedStyles.js';
import Feed from '../Feed/Feed.js';
import FriendsGroups from '../Friends-Groups/Friends-Groups.js';
import SetDoor from '../Door/SetDoor.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
  ScrollView,
  StatusBarIOS,
 } from 'react-native';

import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';

const _onMomentumScrollEnd = (e, state) => {
  console.log('scrolled');
};

class SwiperBase extends React.Component {

  swipeRight() {
    this.refs.scrollView.scrollTo(1);
  }

  swipeLeft() {
    this.refs.scrollView.scrollTo(-1);
  }

  render() {
    const boundMomentumScrollEnd = _onMomentumScrollEnd.bind(this);
    const boundSwipeRight = this.swipeRight.bind(this);
    const boundSwipeLeft = this.swipeLeft.bind(this);

    return (
      <Swiper
        ref="scrollView"
        showsButtons={false}
        loop={false}
        showsPagination={false}
        index={1}
        onMomentumScrollEnd ={boundMomentumScrollEnd}
      >
        <FriendsGroups swipeRight={boundSwipeRight} />
        <Feed swipeRight={boundSwipeRight} swipeLeft={boundSwipeLeft} />
        <SetDoor swipeLeft={boundSwipeLeft} />
      </Swiper>
   );
  }
}

module.exports = SwiperBase;
