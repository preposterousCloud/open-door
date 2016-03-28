import React, { View, Text, Alert, Image } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import EditUser from './EditUser';
import styles from '../../styles/Profile/profileStyles.js';
import { backButton, editButton } from '../Shared/Buttons';
import { navToFull } from '../Shared/NavHelpers';
const actions = require('../../sharedNative/actions/actions');
const profPic = require('../../sharedNative/images/dino-profile.jpeg');

const Profile = (props) => {
  const updateUser = (newUserInfo) => {
    store.dispatch(actions.updateUser(newUserInfo))
    .then(userUpdated => {
      if (!userUpdated) {
        Alert.alert('Username Taken!', 'Try a different one?', [
            { text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          }, {
            text: 'Edit',
            onPress: () => {
              navToFull({
                component: EditUser,
                user: props.route.user,
                onSubmit: updateUser,
              });
            },
            style: 'default',
          },
        ]);
      }
    });
  };
  return (
    <View>
    <NavBar
      title={ 'Profile' }
      leftButton={backButton}
      rightButton={editButton(EditUser, props.route.user, updateUser)}
    />
    <View>
      <View>
        <Image
          source={{ uri: props.route.user.profilePictureUrl }}
          style={styles.profilePic}
        />
      </View>
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
