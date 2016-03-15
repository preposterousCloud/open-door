import Login from './components/Auth/Login.js';
import { reducer, store } from './sharedNative/reducers/reducers.js';
import React from 'react-native';
const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

const configureScene = (route) => (
  route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom
);

const renderScene = (route, navigator) => {
  store.dispatch({
    type: 'SET_APP_NAVIGATOR',
    navigator,
  });
  if (route.component) {
    return React.createElement(route.component, { navigator, route });
  }
};

const opendoor = () => (
  <Navigator
    initialRoute = {{ component: Login }}
    configureScene = {configureScene}
    renderScene = {renderScene}
  />
);

AppRegistry.registerComponent('opendoor', () => opendoor);
