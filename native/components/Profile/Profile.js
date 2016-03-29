
import React, { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import EditUser from './EditUser';
import styles from '../../styles/Profile/profileStyles.js';
import { backButton, editButton } from '../Shared/Buttons';
import { navToFull } from '../Shared/NavHelpers';
import CirclePic from '../Shared/CirclePic';
const actions = require('../../sharedNative/actions/actions');
const profPic = require('../../sharedNative/images/dino-profile.jpeg');

const Profile = (props) => {
  const profilePage = this;
  const updateUser = (newUserInfo) => {
    props.updateUser(newUserInfo)
    .then(updatedUser => {
      if (!updatedUser) {
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
      } else {
        store.dispatch(actions.setUser(updatedUser));
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
      <CirclePic uri={store.getState().user.profilePictureUri} />
      <View style={styles.listEntryView}>
        <Text style={styles.group}>Username: {store.getState().user.userName}</Text>
      </View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          Default Location: {store.getState().user.defaultLocation || 'None'}
        </Text>
      </View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          Default Vibe: {store.getState().user.defaultVibe || 'None'}
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
