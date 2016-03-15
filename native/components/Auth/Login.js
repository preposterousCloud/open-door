import styles from '../../styles/Auth/authStyles.js';
import Swiper from '../Shared/Swiper.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';

const setUser = (userName) => {
  return (dispatch) => {
    const url = 'http://' + 'localhost' + ':3000/api/users/user2';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((user) => {
      return dispatch({
        type: 'SET_USER',
        user: JSON.parse(user._bodyInit),
      });
    });
  };
};
const buttonNav = () => {
  store.dispatch(
    setUser('user2')
  )
  .then(() => {
    store.getState().navigator.push({
      component: Swiper,
    });
  });
};

const Login = () => (
  <View style={styles.loginButton}>
    <TouchableOpacity onPress={buttonNav}>
      <Text>user2</Text>
    </TouchableOpacity>
  </View>
);

module.exports = Login;
