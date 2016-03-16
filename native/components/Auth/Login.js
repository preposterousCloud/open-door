import React, {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import Swiper from '../Shared/Swiper.js';
import styles from '../../styles/Auth/authStyles.js';
import api from '../../sharedNative/utils/login.js';

const buttonNav = (userName) => {
  store.dispatch(api.setUser(userName))
  .then((action) => {
    if (action) {
      store.getState().navigation.navigator.push({
        component: Swiper,
      });
    } else {
      Alert.alert(`${userName}`, 'not found', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Create', onPress: () => console.log('OK Pressed'), style: 'default' },
      ]);
    }
  });
};

const loginWithUser1 = () => buttonNav('user1');
const loginWithUser2 = () => buttonNav('user2');
const loginWithUser3 = () => buttonNav('user3');
const loginWithUser4 = () => buttonNav('user4');
const loginWithUser5 = () => buttonNav('user5');

let userName;

const updateUserName = newUserName => { userName = newUserName; };
const loginWithUser = () => {
  console.log(userName);
  buttonNav(userName);
};

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
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={false}
      maxLength={16}
      placeholder={'userName'}
      value={userName}
      style={styles.userInput}
      returnKeyType={'go'}
      onChangeText={updateUserName}
      onSubmitEditing={loginWithUser}
    />
  </View>
);

module.exports = Login;
