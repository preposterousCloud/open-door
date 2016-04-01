import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const OpenDoor = (props) => (
  <Icon name="happy-outline" size={ props.styles.size } color={ props.styles.color } />
);

OpenDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export const ClosedDoor = (props) => (
  <Icon name="ios-close-empty" size={ props.styles.size } color={ props.styles.color } />
);

ClosedDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export const SettingsGear = (props) => (
  <Icon name="gear-a" size={props.style.size} color={props.style.color} />
);

SettingsGear.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const List = (props) => (
  <Icon name="ios-list-outline" size={props.style.size} color={props.style.color} />
);

List.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const LeftArrow = (props) => (
  <Icon name="android-arrow-back" size={props.style.size} color={props.style.color} />
);

LeftArrow.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const RightArrow = (props) => (
  <Icon name="android-arrow-forward" size={props.style.size} color={props.style.color} />
);

RightArrow.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const XIcon = (props) => (
  <Icon name="ios-close-outline" size={props.style.size} color={props.style.color} />
);

XIcon.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const Plus = (props) => (
  <Icon name="ios-plus-outline" size={props.style.size} color={props.style.color} />
);

Plus.propTypes = {
  style: React.PropTypes.object.isRequired,
};
