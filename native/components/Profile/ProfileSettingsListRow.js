import React, { Text, View } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import styles from '../../styles/Profile/profileStyles.js';

const ProfileSettingsListRow = () => (
  <View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Username: {store.getState().user.userName}</Text>
    </View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Location: {store.getState().user.location}</Text>
    </View>
    <View style={styles.listEntryViewDef}>
      <Text style={styles.group}>Default Vibe: {store.getState().user.vibe}</Text>
    </View>
  </View>
);

module.exports = ProfileSettingsListRow;
