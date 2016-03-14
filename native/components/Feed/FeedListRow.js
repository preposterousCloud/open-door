import React, { Text, View } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';

import Accordion from 'react-native-accordion';

const FeedListRow = (rowText) => {
  const header = (
    <View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          {rowText}
        </Text>
      </View>
    </View>
  );

  const content = (
    <View>
      <View>
        <Text style={styles.group}>
          {'sup yo'}
        </Text>
      </View>
    </View>
  );

  return (
    <Accordion
      header={header}
      content={content}
      easing="easeOutCubic"
    />
  );
};

module.exports = FeedListRow;
