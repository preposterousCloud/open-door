import React, {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../sharedNative/reducers/reducers.js';
import { attemptLogin, createUser } from '../../sharedNative/actions/actions.js';
import Swiper from '../Shared/Swiper.js';
import styles from '../../styles/Auth/authStyles.js';

const SwiperContainer = connect((state) => {
  return {
    app: state.app,
  };
})(Swiper);

const advanceToSwiper = () => (store.getState()
  .navigation.navigator.push({ component: SwiperContainer })
);

const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const alertUserNotFound = (userName) => {
  Alert.alert(`${userName}`, 'not found', [
    cancelButton,
    { text: 'Create',
      onPress: () => store.dispatch(createUser(userName))
      .then(user => user && advanceToSwiper()),
      style: 'default',
    },
  ]);
};

const loginWith = (userName) => {
  store.dispatch(attemptLogin(userName))
  .then(userFound => {
    if (userFound) {
      advanceToSwiper();
    } else {
      alertUserNotFound(userName);
    }
  });
};

const loginWithUser1 = () => loginWith('user1');
const loginWithUser2 = () => loginWith('user2');
const loginWithUser3 = () => loginWith('user3');
const loginWithUser4 = () => loginWith('user4');
const loginWithUser5 = () => loginWith('user5');

let userName;

const updateUserName = newUserName => { userName = newUserName; };
const loginWithUser = () => {
  console.log(userName);
  loginWith(userName);
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
