import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const SetDoor = (props) => {
  const leftNavButton = {
    title: '<',
    handler: props.swipeLeft,
  };
  return (
    <View>
    <NavBar
      title={ 'Event Details' }
      leftButton={leftNavButton}
    />
    <Text>User: {store.getState().focusEventDetails.user}</Text>
    <Text>Door Status: {store.getState().focusEventDetails.doorStatus}</Text>
  </View>
  );
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.function,
};

module.exports = SetDoor;
