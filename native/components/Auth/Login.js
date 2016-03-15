import Feed from '../Feed/Feed.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';

const goToFeed = () => {
  store.getState().navigator.push({
    component: Feed,
  });
};

const Login = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={goToFeed}>
      <Text>Login</Text>
    </TouchableOpacity>
  </View>
);

module.exports = Login;
