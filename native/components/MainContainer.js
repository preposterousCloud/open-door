import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
  ScrollView,
  StatusBarIOS,
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../sharedNative/reducers/reducers.js';
const actions = require('../sharedNative/actions/actions');

import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';
import Feed from './Feed/Feed.js';
import Social from './Social/Social.js';
import SetDoorContainer from './Door/SetDoorContainer';
import styles from '../styles/Feed/feedStyles.js';

const FeedContainer = connect((state, ownProps) => {
  return {
    events: state.user.Events,
    userName: state.user.userName,
    swipeLeft: ownProps.swipeLeft,
    swipeRight: ownProps.swipeRight,
  };
}, (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
})(Feed);

const SocialContainer = connect((state, ownProps) => {
  return {
    user: state.user,
    swipeRight: ownProps.swipeRight,
  };
})(Social);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
  }
  componentWillMount() {
    this.props.onLoad();
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
    return (
        <Swiper
          ref="scrollView"
          showsButtons={false}
          loop={false}
          showsPagination={false}
          index={ this.props.app.swiperIndex }
          onMomentumScrollEnd = {this._onMomentumScrollEnd}
        >
          <SocialContainer swipeRight = {this.swipeRight} />
          <FeedContainer swipeLeft = {this.swipeLeft} swipeRight = {this.swipeRight} />
          <SetDoorContainer swipeLeft={this.swipeLeft} />
        </Swiper>
   );
  }
}

Main.propTypes = {
  app: React.PropTypes.object.isRequired,
  onLoad: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(actions.appInit());
    },
  };
};
const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

module.exports = MainContainer;
