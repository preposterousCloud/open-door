import React, { View, Text } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Profile/profileStyles.js';

const closeProfileSettings = () => {
  store.getState().navigation.navigator.pop();
};

const Profile = (props) => {
  console.log('props for profile:', props);
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
    <View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>Username: {store.getState().user.userName}</Text>
      </View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          Default Location: {props.route.user.defaultLocation || 'None'}
        </Text>
      </View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          Default Vibe: {props.route.user.defaultVibe || 'None'}
        </Text>
      </View>
    </View>
  </View>
  );
};

Profile.propTypes = {
  route: React.PropTypes.object,
};

module.exports = Profile;
