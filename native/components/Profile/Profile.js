import React, { View, Text } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import ProfileSettingsList from './ProfileSettingsList.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Profile/profileStyles.js';

const closeProfileSettings = () => {
  store.getState().navigation.navigator.pop();
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
