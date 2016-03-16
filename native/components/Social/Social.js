import styles from '../../styles/Friends-Groups/friends-groupsStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const Social = (props) => {
  const rightNavButton = {
    title: '>',
    handler: props.swipeRight,
  };
  return (
    <View>
    <NavBar
      title={ 'Friends & Groups' }
      rightButton={rightNavButton}
    />
  </View>
  );
};

Social.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Social;
