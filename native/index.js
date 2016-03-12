/**
 * Entry point file
 */

import Feed from './components/Feed/Feed.js';

import React from 'react-native';
const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

const opendoor = () => (
  <Navigator
    initialRoute = {{
      component: Feed,
    }}
    configureScene = {(route) => {
      return route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom;
    }}
    renderScene = {
      (route, navigator) => {
        if (route.component) {
          return React.createElement(route.component, { navigator, route });
        }
      }
    }
  / >
);

AppRegistry.registerComponent('opendoor', () => opendoor);
