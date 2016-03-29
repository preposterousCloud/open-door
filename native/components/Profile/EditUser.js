import React, { Text, TouchableOpacity, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { backButton, cancelButtonNav, cancelButton } from '../Shared/Buttons.js';
import { navToFull, popScene } from '../Shared/NavHelpers.js';
const actions = require('../../sharedNative/actions/actions');
const api = require('../../sharedNative/utils/api.js');
import NavBar from '../Shared/NavBar.js';
const SelectProfilePic = require('./SelectProfilePic');
import CirclePic from '../Shared/CirclePic';
import VibePicker from '../Door/VibePicker.js';
import styles2 from '../../styles/Door/doorStyles.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    const { userName, defaultLocation, defaultVibe } = props.route.user;
    this.state = {
      onSubmit: props.route.onSubmit,
      user: { userName, defaultLocation, defaultVibe, encodedProfPic: null },
    };
  }
  updateLocalUser(update) {
    const user = this.state.user;
    user[Object.keys(update)[0]] = update[Object.keys(update)[0]];
    this.setState({ user });
  }
  render() {
    const submitUser = () => {
      if (!this.state.user.userName) {
        Alert.alert('You need a username!', '', [cancelButton]);
      } else {
        this.state.onSubmit(this.state.user);
        popScene();
      }
    };
    const updateUserName = userName => this.updateLocalUser({ userName });
    const updateDefaultLocation = defaultLocation => this.updateLocalUser({ defaultLocation });
    const updateDefaultVibe = defaultVibe => this.updateLocalUser({ defaultVibe });
    const updateProfPic = encodedProfPic => this.updateLocalUser({ encodedProfPic });

    return (
      <View>
        <NavBar title={'Edit Profile'} leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: submitUser }}
        />
        <TouchableOpacity
          onPress={() => navToFull({
            component: SelectProfilePic,
            updateProfPic,
          })}
        >
          <CirclePic uri={store.getState().user.profilePictureUri} />
        </TouchableOpacity>
        <StyledTextInput
          onChangeText={updateUserName}
          placeholder={store.getState().user.userName}
        />
        <StyledTextInput
          onChangeText={updateDefaultLocation}
          placeholder={store.getState().user.defaultLocation}
        />
        <VibePicker
          changeVibe={updateDefaultVibe}
          initialVibe={store.getState().user.defaultVibe}
        />
      </View>
    );
  }
}

EditUser.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditUser;
