import React, { AppRegistry, Navigator } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './sharedNative/reducers/reducers.js';
import Login from './components/Login.js';

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
  if (route.component) {
    return React.createElement(route.component, { navigator, route });
  }
};

const opendoor = () => (
  <Provider store={store} >
    <Navigator
      initialRoute = {{ component: Login }}
      configureScene = {configureScene}
      renderScene = {renderScene}
    />
  </Provider>
);

AppRegistry.registerComponent('opendoor', () => opendoor);
