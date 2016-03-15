import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const rightNavButton = {
  title: 'Back',
  handler: () => {
    console.log('back button pressed!');
    store.getState().navigator.pop();
  },
};

const Profile = () => (
  <View>
    <NavBar
      title={ 'Profile' }
      rightButton={rightNavButton}
    />
    <Text>Name: {store.getState().focusEventDetails.title}</Text>
    <Text>Home Address: {store.getState().focusEventDetails.address}</Text>
    <Text>Best Friend: {store.getState().focusEventDetails.host}</Text>
  </View>
);

module.exports = Profile;
