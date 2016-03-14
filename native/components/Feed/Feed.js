import styles from '../../styles/Feed/feedStyles.js';
import FeedList from './FeedList.js';
import NavBar from '../Shared/NavBar.js';
import EventDetails from '../Event/EventDetails.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavigationBar from 'react-native-navbar';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
 } from 'react-native';

const navToExampleEvent = () => {
  store.dispatch({
    type: 'SET_FOCUS_EVENT',
    data: {
      title: 'Polar Quest!',
      address: '944 Market St., San Francisco, CA',
      host: 'Old Greg',
    },
  });
  store.getState().navigator.push({
    component: EventDetails,
  });
};

const rightNavButton = {
  title: 'Derecha',
  handler: navToExampleEvent,
};

const Feed = () => (
  <View style={styles.container}>
    <NavBar
      title={ 'Event Feed' }
      rightButton={rightNavButton}
    />
    <FeedList />
  </View>
);

module.exports = Feed;
