import React, { View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../../styles/styles.js';

const NavBar = (props) => (
  <View style={styles.navBarTop}>
    <NavigationBar
      rightButton={props.rightButton}
      leftButton={props.leftButton}
      tintColor={ 'transparent' }
    />
  </View>
);

NavBar.propTypes = {
  rightButton: React.PropTypes.object,
  leftButton: React.PropTypes.object,
};

module.exports = NavBar;
