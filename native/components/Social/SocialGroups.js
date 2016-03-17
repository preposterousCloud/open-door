import React, { View, Text } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';

import styles from '../../styles/Social/socialStyles.js';
import NavBar from '../Shared/NavBar.js';

const closeGroups = () => {
  store.getState().navigation.navigator.jumpBack();
};

const Groups = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: closeGroups,
  };
  return (
    <View>
    <NavBar
      title={ 'Groups' }
      leftButton={leftNavButton}
    />
  </View>
  );
};

module.exports = Groups;
