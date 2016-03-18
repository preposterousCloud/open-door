import styles from '../../styles/Profile/profileStyles.js';
import SetDoor from '../Door/SetDoor';
import ProfileSettingsList from './ProfileSettingsList.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const closeProfileSettings = () => {
  store.getState().navigation.navigator.jumpBack();
};

const Profile = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: closeProfileSettings,
  };
  return (
    <View>
    <NavBar
      title={ 'Profile' }
      leftButton={leftNavButton}
    />
    <ProfileSettingsList />
  </View>
  );
};

Profile.propTypes = {
  swipeRight: React.PropTypes.func,
};

module.exports = Profile;
