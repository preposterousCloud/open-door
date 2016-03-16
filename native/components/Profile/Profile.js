import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const getProfileData = () => {
  store.dispatch({
    type: 'SET_FOCUS_EVENT',
    data: {
      name: 'Old Greg',
      address: '16 Underwood Dr.',
      host: 'Blue',
    },
  });
};

const Profile = (props) => {
  getProfileData();
  const rightNavButton = {
    title: '>',
    handler: props.swipeRight,
  };
  return (
    <View>
    <NavBar
      title={ 'Profile' }
      rightButton={rightNavButton}
    />
    <Text>Name: {store.getState().event.focusEventDetails.name}</Text>
    <Text>Home Address: {store.getState().event.focusEventDetails.address}</Text>
    <Text>Best Friend: {store.getState().event.focusEventDetails.host}</Text>
  </View>
  );
};

Profile.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Profile;
