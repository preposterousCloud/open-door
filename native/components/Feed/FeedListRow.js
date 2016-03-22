import React, { Text, View, Image, Dimensions } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';
const { width, height } = Dimensions.get('window');

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
  const source = require('./walkingDino.gif');
  const content = (
    <View style={styles.imageContainer}>
        <Image
          source={source}
          style={{
            width,
            height: 300,
          }}
        />
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
