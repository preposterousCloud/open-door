import React, { View, Text, TouchableOpacity, NativeModules } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Profile/profileStyles.js';
import { cancelButtonNav } from '../Shared/Buttons';
import { navToFull } from '../Shared/NavHelpers';
const CameraRollView = require('../Camera/CameraRollView');
const actions = require('../../sharedNative/actions/actions');

const SelectProfilePic = class SelectProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.onPhotoSelection = this.onPhotoSelection.bind(this);
  }
  onPhotoSelection(imageObj) {
    // See https://github.com/scottdixon/react-native-upload-from-camera-roll/issues/1 to fix resolution
    NativeModules.ReadImageData.readImage(imageObj.node.image.uri, (encodedImage) => {
      this.props.route.updateProfPic({ base64Image: encodedImage, imageObj });
    });
  }
  render() {
    return (
      <View>
        <NavBar title={'Select Picture'} leftButton={cancelButtonNav} />
        <CameraRollView
          batchSize={20}
          groupTypes ={'All'}
          imagesPerRow={3}
          onPress={ this.onPhotoSelection }
        />
      </View>
    );
  }
};

SelectProfilePic.propTypes = {
  route: React.PropTypes.object,
};

module.exports = SelectProfilePic;
