import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ClosedDoor = (props) => (
  <Icon name="ios-close-empty" size={ props.styles.size } color={ props.styles.color } />
);

ClosedDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

module.exports = ClosedDoor;
