import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
  ScrollView,
  StatusBarIOS,
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../sharedNative/reducers/reducers.js';
const actions = require('../../sharedNative/actions/actions');
import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';
import Feed from '../Feed/Feed.js';
import Social from '../Social/Social.js';
import SetDoorContainer from '../Door/SetDoorContainer';
import styles from '../../styles/Feed/feedStyles.js';

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
    store.dispatch(actions.setSwiperIndex(state.index));
  }

  render(props) {
    const FeedContainer = connect(state => {
      return {
        events: state.user.Events,
        userName: state.user.userName,
        swipeLeft: this.swipeLeft,
        swipeRight: this.swipeRight,
      };
    })(Feed);

    const SocialContainer = connect(state => {
      return {
        user: state.user,
        swipeRight: this.swipeRight,
      };
    })(Social);

    return (
      <Swiper
        ref="scrollView"
        showsButtons={false}
        loop={false}
        showsPagination={false}
        index={ this.props.app.swiperIndex }
        onMomentumScrollEnd ={this._onMomentumScrollEnd}
      >
        <SocialContainer />
        <FeedContainer />
        <SetDoorContainer swipeLeft={this.swipeLeft} />
      </Swiper>
   );
  }
}

module.exports = SwiperBase;
