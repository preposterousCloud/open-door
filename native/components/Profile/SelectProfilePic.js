import React, { View, Text, Alert, TouchableOpacity } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import EditUser from './EditUser';
import styles from '../../styles/Profile/profileStyles.js';
import { backButton, editButton, cancelButtonNav } from '../Shared/Buttons';
import { navToFull } from '../Shared/NavHelpers';
const CameraRollView = require('../Camera/CameraRollView');
const actions = require('../../sharedNative/actions/actions');

const SelectProfilePic = class SelectProfilePic extends React.Component {
  onPhotoSelection(imageObj) {
    console.log(imageObj);
  }
  render() {
    return (
      <View>
        <NavBar title={'Select Profile Picture'} leftButton={cancelButtonNav} />
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

module.exports = SelectProfilePic;
