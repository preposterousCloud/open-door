import { popScene, navTo, navToFull } from './NavHelpers.js';

const exitButton = {
  title: 'X',
  handler: popScene,
};

const backButton = {
  title: 'Back',
  handler: popScene,
};

const cancelButtonNav = {
  title: 'Cancel',
  handler: popScene,
};

const enterButton = (component, focus) => ({
  title: '+',
  handler: navTo.bind(null, component, focus),
});

const editButton = (component, user, onSubmit) => ({
  title: 'Edit',
  handler: navToFull.bind(null, {
    component,
    user,
    onSubmit,
  }),
});

const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

module.exports = {
  exitButton,
  backButton,
  cancelButtonNav,
  enterButton,
  cancelButton,
  editButton,
};
