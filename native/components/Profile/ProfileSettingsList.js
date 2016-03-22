import React, { View } from 'react-native';
import ProfileSettingsListRow from './ProfileSettingsListRow.js';
import styles from '../../styles/Profile/profileStyles.js';

const ProfileSettingsList = () => (
  <View style={styles.container}>
    <ProfileSettingsListRow
      style={styles.listView}
    />
  </View>
);

module.exports = ProfileSettingsList;
