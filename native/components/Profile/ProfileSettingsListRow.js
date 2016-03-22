import React, { Text, View } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import styles from '../../styles/Profile/profileStyles.js';

const ProfileSettingsListRow = () => (
  <View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Name: {store.getState().user.userName}</Text>
    </View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Nickname: TODO</Text>
    </View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Address: TODO</Text>
    </View>
    <View style={styles.listEntryViewDef}>
      <View style={styles.pullLeft}>
        <Text style={styles.group}>Defaults</Text>
      </View>
      <View style={styles.pullRight}>
        <Text style={styles.group}>></Text>
      </View>
    </View>
  </View>
);

module.exports = ProfileSettingsListRow;
