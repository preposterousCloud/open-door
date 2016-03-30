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
import { LoadingWheelContainer } from '../Shared/ComponentHelpers';
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    const { userName, defaultLocation, defaultVibe } = props.route.user;
    // image looks like {imageObj: //A react native image obj, encodedProfPic: // a base64 image}
    this.state = {
      user: { userName, defaultLocation, defaultVibe, image: null },
    };
    this.submitUser = this.submitUser.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updateDefaultLocation = this.updateDefaultLocation.bind(this);
    this.updateDefaultVibe = this.updateDefaultVibe.bind(this);
    this.updateProfPic = this.updateProfPic.bind(this);
  }
  updateLocalUser(update) {
    const user = this.state.user;
    user[Object.keys(update)[0]] = update[Object.keys(update)[0]];
    this.setState({ user });
  }
  submitUser() {
    if (!this.state.user.userName) {
      Alert.alert('You need a username!', '', [cancelButton]);
    } else {
      const userObj = this.state.user;
      userObj.base64Image = this.state.user.image ? this.state.user.image.base64Image : null;
      delete userObj.image;
      this.props.route.onSubmit(userObj)
      .then(() => popScene());
    }
  }
  updateUserName(userName) {
    this.updateLocalUser({ userName });
  }
  updateDefaultLocation(defaultLocation) {
    this.updateLocalUser({ defaultLocation });
  }
  updateDefaultVibe(defaultVibe) {
    this.updateLocalUser({ defaultVibe });
  }
  updateProfPic(image) {
    this.updateLocalUser({ image });
  }
  render() {
    return (
      <View>
        <NavBar title={'Edit Profile'} leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: this.submitUser }}
        />
        <TouchableOpacity
          onPress={() => navToFull({
            component: SelectProfilePic,
            updateProfPic: this.updateProfPic,
          })}
        >
          <CirclePic source={ (this.state.user.image && this.state.user.image.imageObj.node.image) ?
            this.state.user.image.imageObj.node.image : { uri: this.props.route.user.profilePictureUri } }
          />
        </TouchableOpacity>
        <LoadingWheelContainer />
        <StyledTextInput
          onChangeText={this.updateUserName}
          placeholder={this.props.route.user.userName}
        />
        <StyledTextInput
          onChangeText={this.updateDefaultLocation}
          placeholder={this.props.route.user.defaultLocation}
        />
        <VibePicker
          changeVibe={this.updateDefaultVibe}
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
