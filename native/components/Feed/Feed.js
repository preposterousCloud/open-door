import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import FeedNavbar from './FeedNavbar.js';
import NavigationBar from 'react-native-navbar';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
 } from 'react-native';

const Feed = () => (
  <View style={styles.container}>
    <FeedNavbar />
    <FeedList />
  </View>
);

module.exports = Feed;
