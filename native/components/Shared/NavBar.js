import styles from '../../styles/Shared/sharedStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';

import NavigationBar from 'react-native-navbar';
import React, { View } from 'react-native';

const NavBar = (props) => (
  <View>
    <NavigationBar
      title={{ title: props.title }}
      rightButton={props.rightButton}
      leftButton={props.leftButton}
      style={styles.navBar}
    />
  </View>
);

NavBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  rightButton: React.PropTypes.object,
  leftButton: React.PropTypes.object,
};

module.exports = NavBar;
