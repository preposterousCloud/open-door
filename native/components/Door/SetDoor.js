import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text, TouchableOpacity } from 'react-native';
const actions = require('../../sharedNative/actions/actions');

const SetDoor = (props) => {
  const leftNavButton = {
    title: '<',
    handler: props.swipeLeft,
  };

  let DoorStatus;
  if (store.getState().currentEvent) {
    doorStatus = 'PARTY TIME';
  } else {
    doorStatus = 'BOOO!';
  }

  const toggleDoor = () => {
    const dummyEvent = { name: 'Party' };
    store.dispatch(actions.toggleEvent(dummyEvent));
  };
  return (
    <View>
    <NavBar
      title={ 'Event Details' }
      leftButton={leftNavButton}
    />
    <TouchableOpacity onPress={toggleDoor}>
      <Text>DOOR</Text>
    </TouchableOpacity>
    <Text> {doorStatus} </Text>
  </View>
  );
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.function,
};

module.exports = SetDoor;
