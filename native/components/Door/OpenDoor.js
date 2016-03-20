import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OpenDoor = (props) => (
  <Icon name="happy-outline" size={ props.styles.size } color={ props.styles.color } />
);

OpenDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

module.exports = OpenDoor;
