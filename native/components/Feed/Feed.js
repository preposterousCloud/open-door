import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
  ScrollView,
 } from 'react-native';

import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import NavBar from '../Shared/NavBar.js';
import SetDoor from '../Door/SetDoor.js';
import Social from '../Social/Social.js';
import {
  exitButton,
  enterButton,
  makeClickableRow,
  makeListContainer,
} from '../Shared/Misc.js';

const Feed = (props) => {
  const rightNavButton = {
    title: 'My Door',
    handler: props.swipeRight,
  };

  const leftNavButton = {
    title: 'Social',
    handler: props.swipeLeft,
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={props.userName}
        rightButton={rightNavButton}
        leftButton={leftNavButton}
      />
      <FeedList events={props.events} />
    </View>
  );
};

Feed.propTypes = {
  swipeRight: React.PropTypes.func,
  swipeLeft: React.PropTypes.func,
  userName: React.PropTypes.string,
  events: React.PropTypes.array,
};

module.exports = Feed;
