import React, { View, Text, TouchableOpacity } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Social/socialStyles.js';
import Friends from './Friends';

const showFriends = () => {
  store.getState().navigation.navigator.push({
    component: Friends,
  });
};

const Social = (props) => {
  const rightNavButton = {
    title: '>',
    handler: props.swipeRight,
  };
  return (
    <View>
      <NavBar
        title={ 'Social' }
        rightButton={rightNavButton}
      />
      <TouchableOpacity onPress={showFriends}>
        <Text>Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

Social.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Social;
