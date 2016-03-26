import { store } from '../../sharedNative/reducers/reducers.js';

const navTo = (component, focus) => {
  store.getState().navigation.navigator.push({ component, focus });
};

const navToFull = (destination) => {
  store.getState().navigation.navigator.push(destination);
};

const popScene = () => {
  store.getState().navigation.navigator.pop();
};

module.exports = {
  navToFull,
  navTo,
  popScene,
};
