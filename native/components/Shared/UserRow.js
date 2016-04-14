import React, { Text, View } from 'react-native';
import CirclePic from './CirclePic';
import styles from '../../styles/styles.js';
import { store } from '../../sharedNative/reducers/reducers.js';

export const UserRow = (props) => {
  const contactMapper = store.getState().contactMap;
  return (
    <View style={styles.listEntryView}>
      <View style={styles.rowPic}>
        <CirclePic source={{ uri: props.profilePictureUri }}
          size={60}
        />
      </View>
      <View style={styles.userRowText}>
        <Text style={styles.mediumText}>{contactMapper[props.id] || props.userName}</Text>
        <Text style={styles.smallText}>{contactMapper[props.id] && props.userName}</Text>
      </View>
    </View>
  );
};

UserRow.propTypes = {
  profilePictureUri: React.PropTypes.string,
  userName: React.PropTypes.string,
  id: React.PropTypes.number,
};
