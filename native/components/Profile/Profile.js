import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const Profile = (props) => {
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
    <Text>Name: {store.getState().focusEventDetails.title}</Text>
    <Text>Home Address: {store.getState().focusEventDetails.address}</Text>
    <Text>Best Friend: {store.getState().focusEventDetails.host}</Text>
  </View>
  );
};

Profile.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Profile;
