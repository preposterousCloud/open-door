import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';
const actions = require('../../sharedNative/actions/actions');

import styles from '../../styles/Door/doorStyles.js';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';


const settingsNav = () => {
  store.getState().navigation.navigator.push({
    component: Profile,
  });
};

const SetDoor = (props) => {
  const leftNavButton = {
    title: '<',
    handler: props.swipeLeft,
  };

  let DoorStatus;
  if (props.user.currentEvent) {
    doorStatus = 'PARTY TIME';
  } else {
    doorStatus = 'BOOO!';
  }

  const toggleDoor = (user) => {
    // We blindly send the event object. in the scenario we are disabling the current event
    // it wont be used
    const dummyEvent = { name: 'Party', hostUserId: user.id };
    store.dispatch(actions.toggleEvent(dummyEvent));
  };
  return (
    <View style={styles.container}>
    <NavBar
      title={ 'My Door' }
      leftButton={leftNavButton}
    />
    
    <TouchableOpacity onPress={() => toggleDoor(props.user)}>
      <Text>DOOR</Text>
    </TouchableOpacity>
    <Text> {doorStatus} </Text>

    <View style={styles.footer}>
      <TouchableOpacity style={styles.pullRight} onPress={settingsNav}>
      <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.function,
  user: React.PropTypes.object,
};

module.exports = SetDoor;
