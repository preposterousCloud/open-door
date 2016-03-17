import React, {
  Text,
  View,
 } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';

import styles from '../../styles/Social/socialStyles.js';

const Friends = (props) => (
  <View style={styles.socialF}>
    <Text>FRIENDS</Text>
  </View>
);

module.exports = Friends;
