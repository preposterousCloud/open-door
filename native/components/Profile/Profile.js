
import React, { Alert, View, Text, TouchableOpacity, Image } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBarTop from '../Shared/NavBarTop.js';
import { BackgroundImage } from '../Shared/BackgroundImage.js';
import EditUser from './EditUser';
import { navToFull } from '../Shared/NavHelpers';
import { centerContainerNoMargin, profileLineContainer, topBuffer,
  stackVertical, center, white, bold } from '../../styles/styles.js';
import { backButton, editButton, exitButton } from '../Shared/Buttons';
import NavigationBar from 'react-native-navbar';

import CirclePic from '../Shared/CirclePic';
const actions = require('../../sharedNative/actions/actions');
const profPic = require('../../sharedNative/images/dino-profile.jpeg');
import vibes from '../Door/vibes.js';

const Profile = (props) => {
  const updateUser = (user) => {
    return props.updateUser(user)
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
                user: props.user,
                onSubmit: updateUser,
              });
            },
            style: 'default',
          },
        ]);
        return null;
      }
      return updatedUser;
    });
  };
  const logout = () => store.dispatch(actions.logout());
  return (
      <BackgroundImage source={require('../../static/bgLibrary/everything.png')}>
        <NavBarTop
          title={{ title: 'Profile' }}
          leftButton={exitButton}
          rightButton={editButton(EditUser, props.user, updateUser)}
          tintColor={ 'transparent' }
        />
        <View style={centerContainerNoMargin}>
          <CirclePic size={200} source={ { uri: props.user.profilePictureUri }} />
          <View style={topBuffer} />
          <View style={[profileLineContainer, stackVertical, center]}>
            <Text style={[white]}>username</Text>
            <Text style={[bold, white]}>{ props.user.userName }</Text>
          </View>
          <View style={[profileLineContainer, stackVertical, center]}>
            <Text style={[white]}>default address</Text>
            <Text style={[bold, white]}>{props.user.defaultLocation || 'None'}</Text>
          </View>
          <View style={[profileLineContainer, stackVertical, center]}>
            <Text style={[white]}>default vibe</Text>
            <Text style={[bold, white]}>
              {(vibes && props.user && props.user.defaultVibe &&
                vibes[props.user.defaultVibe] && vibes[props.user.defaultVibe].name)
                || 'None'}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} >
            <View style={topBuffer}>
              <Text style={[bold, white]}>
                logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BackgroundImage>
  );
};

Profile.propTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
};

module.exports = Profile;
