import React, { View, Image } from 'react-native';
import styles from '../../styles/styles.js';

const CirclePic = (props) => {
  let preferredStyles = props.style || styles.profilePic;
  if (props.size) {
    preferredStyles = {
      height: props.size,
      width: props.size,
      borderRadius: props.size / 2,
    };
  }
  return (
    <View>
      <Image
        source={{ uri: props.uri || props.source.uri }}
        style={preferredStyles}
      />
    </View>
  );
};

CirclePic.propTypes = {
  source: React.PropTypes.object,
  uri: React.PropTypes.string,
  size: React.PropTypes.number,
  style: React.PropTypes.object,
};
module.exports = CirclePic;
