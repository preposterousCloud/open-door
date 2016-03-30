import React, { View, Image } from 'react-native';
import styles from '../../styles/Profile/profileStyles.js';

const CirclePic = (props) => {
  return (
    <View>
      <Image
        source={{ uri: props.uri || props.source.uri }}
        style={styles.profilePic}
      />
    </View>
  );
};

CirclePic.propTypes = {
  source: React.PropTypes.object,
  uri: React.PropTypes.string,
};
module.exports = CirclePic;
