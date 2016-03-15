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
  StatusBarIOS,
 } from 'react-native';

import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';

const _onMomentumScrollEnd = (e, state) => {
  // this.setState({ index: state.index });
  // StatusBarIOS.setHidden(state.index === 1);
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

    // currently not in use
    store.dispatch({
      type: 'SET_SWIPE_RIGHT',
      ref: this.refs.scrollView,
    });

    return (
      <Swiper
        ref="scrollView"
        showsButtons={false}
        loop={false}
        showsPagination={false}
        index={1}
        onMomentumScrollEnd ={boundMomentumScrollEnd}
      >
        <Profile swipeRight={boundSwipeRight} />
        <Feed swipeRight={boundSwipeRight} swipeLeft={boundSwipeLeft} />
        <SetDoor swipeLeft={boundSwipeLeft} />
      </Swiper>
   );
  }
}

// const SwiperBase = () => (
//   <View style={styles.container}>
//     <Swiper
//       index={1}
//       showsButtons={false}
//       loop={false}
//       showsPagination={false}
//     >
//       <Profile />
//       <Feed />
//       <SetDoor />
//     </Swiper>
//   </View>
// );

module.exports = SwiperBase;
