import React, { View, Image } from 'react-native';
import styles from '../../styles/Profile/profileStyles.js';

const CirclePic = (props) => (
  <View>
    <Image
      source={{ uri: props.uri }}
      style={styles.profilePic}
    />
  </View>
);

CirclePic.propTypes = { uri: React.PropTypes.string };
module.exports = CirclePic;
