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
import { connect } from 'react-redux';

import styles from '../../styles/Feed/feedStyles.js';
import Feed from '../Feed/Feed.js';
import Profile from '../Profile/Profile.js';
import SetDoor from '../Door/SetDoor.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';

class SwiperBase extends React.Component {
  constructor(props) {
    super(props);
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
  }

  swipeRight() {
    this.refs.scrollView.scrollTo(1);
  }

  swipeLeft() {
    this.refs.scrollView.scrollTo(-1);
  }

  _onMomentumScrollEnd(e, state) {
    console.log('scrolled');
  }

  mapStateToProps(state) {
    return {
      currentEvent: state.currentEvent,
      swipeLeft: this.swipeLeft,
    };
  }

  render() {
    const Door = connect(this.mapStateToProps)(SetDoor);
    return (
      <Swiper
        ref="scrollView"
        showsButtons={false}
        loop={false}
        showsPagination={false}
        index={1}
        onMomentumScrollEnd ={this._onMomentumScrollEndMomentumScrollEnd}
      >
        <Profile swipeRight={this.swipeRight} />
        <Feed swipeRight={this.swipeRight} swipeLeft={this.swipeLeft} />
        <Door />
      </Swiper>
   );
  }
}

module.exports = SwiperBase;
