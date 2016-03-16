import styles from '../../styles/Door/doorStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';
import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';

const getDoorData = () => {
  store.dispatch({
    type: 'SET_FOCUS_EVENT',
    data: {
      user: 'Old Greg',
      doorStatus: 'CLOSED',
    },
  });
};

const settingsNav = () => {
  store.getState().navigation.navigator.push({
    component: Profile,
  });
};

const SetDoor = (props) => {
  getDoorData();
  const leftNavButton = {
    title: '<',
    handler: props.swipeLeft,
  };
  return (
    <View style={styles.container}>
    <NavBar
      title={ 'My Door' }
      leftButton={leftNavButton}
    />
    <Text>User: {store.getState().event.focusEventDetails.user}</Text>
    <Text>Door Status: {store.getState().event.focusEventDetails.doorStatus}</Text>
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
};

module.exports = SetDoor;