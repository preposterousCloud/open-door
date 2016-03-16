import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavBar from '../Shared/NavBar.js';
import React, { View, Text } from 'react-native';

const Profile = (props) => {
  const rightNavButton = {
    title: '>',
    handler: props.swipeRight,
  };
  return (
    <View>
    <NavBar
      title={ 'Profile' }
      rightButton={rightNavButton}
    />
    <Text>Name: {store.getState().user.userName}</Text>
    <Text>Nickname: TODO</Text>
    <Text>Address: TODO</Text>
  </View>
  );
};

Profile.propTypes = {
  swipeRight: React.PropTypes.function,
};

module.exports = Profile;
