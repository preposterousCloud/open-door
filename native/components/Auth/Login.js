import Swiper from '../Shared/Swiper.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';

const goToMain = () => {
  store.getState().navigator.push({
    component: Swiper,
  });
};

const Login = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={goToMain}>
      <Text>Login</Text>
    </TouchableOpacity>
  </View>
);

module.exports = Login;
