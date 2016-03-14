import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import FeedNavbar from '../Shared/NavBar.js';
import NavigationBar from 'react-native-navbar';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
 } from 'react-native';

const Feed = () => (
  <View style={styles.container}>
    <FeedNavbar
      title={ 'Event Feed' }
    />
    <FeedList />
  </View>
);

module.exports = Feed;
