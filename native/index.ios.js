import React, { AppRegistry, Navigator } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './sharedNative/reducers/reducers.js';
import Login from './components/Login.js';
import MainContainer from './components/MainContainer';

const configureScene = (route) => {
  const sceneConfig = route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom;
  sceneConfig.gestures = null;
  return sceneConfig;
};

const renderScene = (route, navigator) => {
  store.dispatch({
    type: 'SET_APP_NAVIGATOR',
    navigator,
  });
  if (route.name === 'Main') {
    return React.createElement(MainContainer, { navigator, route });
  }
  if (route.name === 'Login') {
    return React.createElement(Login, { navigator, route });
  }
  if (route.component) {
    return React.createElement(route.component, { navigator, route });
  }
};

const opendoor = () => (
  <Provider store={store} >
    <Navigator
      initialRoute = {{ name: 'Login' }}
      configureScene = {configureScene}
      renderScene = {renderScene}
    />
  </Provider>
);

AppRegistry.registerComponent('opendoor', () => opendoor);
