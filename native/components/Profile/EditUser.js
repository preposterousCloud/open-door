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
    // image looks like {imageObj: //A react native image obj, encodedProfPic: // a base64 image}
    this.state = {
      user: { userName, defaultLocation, defaultVibe, image: null },
    };
    this.submitUser = this.submitUser.bind(this);
  }
  updateLocalUser(update) {
    const user = this.state.user;
    user[Object.keys(update)[0]] = update[Object.keys(update)[0]];
    console.log('user', user);
    this.setState({ user });
  }
  submitUser() {
    if (!this.state.user.userName) {
      Alert.alert('You need a username!', '', [cancelButton]);
    } else {
      const userObj = this.state.user;
      userObj.base64Image = this.state.user.image.base64Image;
      delete userObj.image;
      this.props.route.onSubmit(userObj);
      popScene();
    }
  }
  render() {
    const updateUserName = userName => this.updateLocalUser({ userName });
    const updateDefaultLocation = defaultLocation => this.updateLocalUser({ defaultLocation });
    const updateDefaultVibe = defaultVibe => this.updateLocalUser({ defaultVibe });
    const updateProfPic = image => {
      console.log('image', image);
      this.updateLocalUser({ image });
    };

    return (
      <View>
        <NavBar title={'Edit Profile'} leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: this.submitUser }}
        />
        <TouchableOpacity
          onPress={() => navToFull({
            component: SelectProfilePic,
            onSubmit: updateProfPic,
          })}
        >
          <CirclePic source={ (this.state.user.image && this.state.user.image.imageObj.node.image) ?
            this.state.user.image.imageObj.node.image : { uri: this.props.route.user.profilePictureUri } }
          />
        </TouchableOpacity>
        <StyledTextInput
          onChangeText={updateUserName}
          placeholder={this.props.route.user.userName}
        />
        <StyledTextInput
          onChangeText={updateDefaultLocation}
          placeholder={this.props.route.user.defaultLocation}
        />
        <VibePicker
          changeVibe={updateDefaultVibe}
          initialVibe={this.props.route.user.defaultVibe}
        />
      </View>
    );
  }
}

EditUser.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditUser;
