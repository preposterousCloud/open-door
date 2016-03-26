import React, { View, Text } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import EditUser from './EditUser';
import styles from '../../styles/Profile/profileStyles.js';
import { backButton, editButton } from '../Shared/Buttons';
const actions = require('../../sharedNative/actions/actions');

const Profile = (props) => {
  return (
    <View>
    <NavBar
      title={ 'Profile' }
      leftButton={backButton}
      rightButton={editButton(EditUser, props.route.user, actions.updateUser)}
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
