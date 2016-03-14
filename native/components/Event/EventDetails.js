import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const leftNavButton = {
  title: 'Back',
  handler: () => {
    console.log('back button pressed!');
    store.getState().navigator.pop();
  },
};

const EventDetails = (props) => (
  <View>
    <NavBar
      title={ 'Event Details' }
      leftButton={leftNavButton}
    />
    <Text>Title: {store.getState().focusEventDetails.title}</Text>
    <Text>Address: {store.getState().focusEventDetails.address}</Text>
    <Text>Host: {store.getState().focusEventDetails.host}</Text>
  </View>
);

EventDetails.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EventDetails;
