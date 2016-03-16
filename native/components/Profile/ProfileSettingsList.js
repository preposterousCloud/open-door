import styles from '../../styles/Profile/profileStyles.js';
import ProfileSettingsListRow from './ProfileSettingsListRow.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  Text,
  View,
  Component,
  TouchableHighlight,
 } from 'react-native';

const ProfileSettingsList = () => (
  <View style={styles.container}>
    <ProfileSettingsListRow
      style={styles.listView}
    />
  </View>
);

module.exports = ProfileSettingsList;
