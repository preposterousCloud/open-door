import React, { TouchableOpacity } from 'react-native';
import { popScene, navTo, navToFull } from './NavHelpers.js';
import { XIcon, Plus, Edit, Check } from './Icons';

const exitButton = (
  <TouchableOpacity onPress={popScene}>
    <XIcon style={{ size: 50, color: 'white' }} />
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
    <Plus style={{ size: 50, color: 'white' }} />
  </TouchableOpacity>
);

const saveButton = (onSave) => (
  <TouchableOpacity onPress={onSave}>
    <Check style={{ size: 50, color: 'white' }} />
  </TouchableOpacity>
);

const editButton = (component, user, onSubmit) => (
  <TouchableOpacity onPress={ navToFull.bind(null, {
    component,
    user,
    onSubmit,
  })}
  >
    <Edit style={{ size: 20, color: 'white' }} />
  </TouchableOpacity>
);

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
  saveButton,
  cancelButton,
  editButton,
};
