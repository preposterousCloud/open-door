import styles from '../../styles/Feed/feedStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavigationBar from 'react-native-navbar';
import React, { View } from 'react-native';

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const titleConfig = { title: 'Event Feed' };

const FeedNavBar = () => (
  <View>
    <NavigationBar
      title={titleConfig}
      rightButton={rightButtonConfig}
      style={styles.navBar}
    />
  </View>
);

module.exports = FeedNavBar;
