import React, { Text, View } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';

const FeedListRow = (rowText) => (
  <View style={styles.container}>
    <View style={styles.rightContainer}>
      <Text style={styles.group}>
        {rowText}
      </Text>
    </View>
  </View>
);

module.exports = FeedListRow;
