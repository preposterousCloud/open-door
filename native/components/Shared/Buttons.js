import React, { TouchableOpacity } from 'react-native';
import { popScene, navTo, navToFull } from './NavHelpers.js';
import { XIcon, PersonAdd } from './Icons';

const exitButton = (
  <TouchableOpacity onPress={popScene} style={{ margin: 10 }}>
    <XIcon style={{ size: 40, color: 'white' }} />
  </TouchableOpacity>
);

const backButton = {
  title: 'Back',
  handler: popScene,
};

const cancelButtonNav = {
  title: 'Cancel',
  handler: popScene,
};

const enterButton = (component, focus) => (
  <TouchableOpacity onPress={ navTo.bind(null, component, focus) }>
    <PersonAdd style={{ size: 40, color: 'white' }} />
  </TouchableOpacity>
);

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
