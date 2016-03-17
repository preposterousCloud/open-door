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

const advanceToSwiper = () => (store.getState()
  .navigation.navigator.push({
    component: Swiper,
  })
);

const createUser = (userName) => {
  store.dispatch(api.createUser(userName))
  .then((action) => {
    if (action) {
      advanceToSwiper();
    }
  });
};

const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const attemptLogin = (userName) => {
  store.dispatch(api.setUser(userName))
  .then((action) => {
    if (action) {
      advanceToSwiper();
    } else {
      Alert.alert(`${userName}`, 'not found', [
        cancelButton,
        { text: 'Create', onPress: () => createUser(userName), style: 'default' },
      ]);
    }
  });
};

const loginWithUser1 = () => attemptLogin('user1');
const loginWithUser2 = () => attemptLogin('user2');
const loginWithUser3 = () => attemptLogin('user3');
const loginWithUser4 = () => attemptLogin('user4');
const loginWithUser5 = () => attemptLogin('user5');

let userName;

const updateUserName = newUserName => { userName = newUserName; };
const loginWithUser = () => {
  console.log(userName);
  attemptLogin(userName);
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
