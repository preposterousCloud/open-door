import styles from '../../styles/Profile/profileStyles.js';
import ProfileSettingsList from './ProfileSettingsList.js';
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
    <ProfileSettingsList />
  </View>
  );
};

Profile.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Profile;
