import Swiper from '../Shared/Swiper.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';
import styles from '../../styles/Auth/authStyles.js';
import api from '../../sharedNative/utils/login.js';

const buttonNav = (userName) => {
  store.dispatch(api.setUser(userName))
  .then(() => {
    store.getState().navigation.navigator.push({
      component: Swiper,
    });
  });
};

const loginWithUser1 = () => buttonNav('user1');
const loginWithUser2 = () => buttonNav('user2');
const loginWithUser3 = () => buttonNav('user3');
const loginWithUser4 = () => buttonNav('user4');
const loginWithUser5 = () => buttonNav('user5');

const Login = () => (
  <View style={styles.loginButton}>
    <TouchableOpacity onPress={loginWithUser2}>
      <Text>user2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={loginWithUser3}>
      <Text>user3</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={loginWithUser4}>
      <Text>user4</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={loginWithUser5}>
      <Text>user5</Text>
    </TouchableOpacity>
  </View>
);

module.exports = Login;
