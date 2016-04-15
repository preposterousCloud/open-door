import React, { View, Text, TouchableOpacity, NativeModules } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { store } from '../../sharedNative/reducers/reducers.js';
import styles from '../../styles/styles.js';
import { cancelButtonNav } from '../Shared/Buttons';
import { navToFull } from '../Shared/NavHelpers';
const CameraRollView = require('../Camera/CameraRollView');
const actions = require('../../sharedNative/actions/actions');
import { BackgroundImage } from '../Shared/BackgroundImage.js';

const SelectPic = class SelectPic extends React.Component {
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
    const backgroundImageSource = require('../../static/bgLibrary/beigeblue.png');
    return (
      <View>
      <BackgroundImage source={backgroundImageSource} event blur={'light'}>
        <NavigationBar
          tintColor={ 'transparent' }
          title={{ title: 'SELECT A PICTURE' }}
          leftButton={cancelButtonNav}
        />
        <View style={[{ paddingLeft: 4, paddingRight: 8 }, styles.fullScreenUnderNavbar]} >
          <CameraRollView
            batchSize={20}
            groupTypes ={'All'}
            imagesPerRow={3}
            onPress={ this.onPhotoSelection }
          />
        </View>
        </BackgroundImage>
      </View>
    );
  }
};

SelectPic.propTypes = {
  route: React.PropTypes.object,
};

module.exports = SelectPic;
