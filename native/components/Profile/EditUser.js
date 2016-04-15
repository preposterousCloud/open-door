import React, { Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { backButton, cancelButtonNav, cancelButton } from '../Shared/Buttons.js';
import { navToFull, popScene } from '../Shared/NavHelpers.js';
const actions = require('../../sharedNative/actions/actions');
const api = require('../../sharedNative/utils/api.js');
const SelectPic = require('./SelectPic');
import CirclePic from '../Shared/CirclePic';
import VibePicker from '../Door/VibePicker.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import styles from '../../styles/styles.js';
import { BackgroundImage } from '../Shared/BackgroundImage.js';
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
    popScene();
  }
  getProfilePictureSource() {
    if (this.state.user.image && this.state.user.image.imageObj.node.image) {
      return this.state.user.image.imageObj.node.image;
    }
    return { uri: this.props.route.user.profilePictureUri };
  }
  render() {
    return (
      <BackgroundImage source={require('../../static/bgLibrary/everything.png')}>
        <NavigationBar
          tintColor={ 'transparent' }
          title={{ title: 'Edit Profile' }}
          leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: this.submitUser }}
        />
        <ScrollView scrollEnabled={false} >
        <View style={styles.centerContainerNoMargin}>
          <TouchableOpacity
            onPress={() => navToFull({
              component: SelectPic,
              updateProfPic: this.updateProfPic,
            })}
          >
            <CirclePic source={this.getProfilePictureSource()} />
          </TouchableOpacity>
          <LoadingWheelContainer />
          <StyledTextInput
            onChangeText={this.updateUserName}
            placeholder={this.props.route.user.userName}
          />
          <Text style={styles.white} >username</Text>
          <StyledTextInput
            onChangeText={this.updateDefaultLocation}
            placeholder={this.props.route.user.defaultLocation}
          />
          <Text style={styles.white} >default location</Text>
          <View style={styles.vibePicker}>
            <VibePicker
              changeVibe={this.updateDefaultVibe}
              initialVibe={this.props.route.user.defaultVibe}
            />
          </View>
          <Text style={[styles.white]} >default vibe</Text>
        </View>
        </ScrollView>
      </BackgroundImage>
    );
  }
}

EditUser.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditUser;
