import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavigationBar from 'react-native-navbar';
import React, { View, Text } from 'react-native';

const rightNavButton = {
  title: 'Next',
  handler: () => console.log('hello!'),
};

const EventDetails = () => (
  <View>
    <NavigationBar
      title={{ title: 'Event Details' }}
      rightButton={rightNavButton}
      style={styles.navBar}
    />
    <Text>Title: {store.getState().focusEventDetails.title}</Text>
    <Text>Address: {store.getState().focusEventDetails.address}</Text>
    <Text>Host: {store.getState().focusEventDetails.host}</Text>
  </View>
);

module.exports = EventDetails;
