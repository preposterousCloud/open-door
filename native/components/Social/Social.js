import React, { View, Text, TouchableOpacity } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import styles from '../../styles/Social/socialStyles.js';
<<<<<<< HEAD
import Friends from './Friends/Friends.js';
=======
import Friends from './Friends';
>>>>>>> 0b98efd6be5d5404c9832e0fad1bc13b3b8f1eb3

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
