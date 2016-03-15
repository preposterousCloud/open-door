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

const SetDoor = () => (
  <View>
    <NavBar
      title={ 'Event Details' }
      leftButton={leftNavButton}
    />
    <Text>User: {store.getState().focusEventDetails.user}</Text>
    <Text>Door Status: {store.getState().focusEventDetails.doorStatus}</Text>
  </View>
);

module.exports = SetDoor;
