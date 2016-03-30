import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';
const { width, height } = Dimensions.get('window');
import Accordion from 'react-native-accordion';
import EventDetail from './EventDetail';
import CirclePic from '../Shared/CirclePic';

const FeedListRow = (event) => {
  const header = (
    <View>
      <View style={styles.listEntryView}>
        <Text style={styles.group}>
          {event.name}
        </Text>
        <CirclePic source={ { uri: event.hostUser.profilePictureUri }}
          style={{ height: 25, width: 25 }} size={40}
        />
      </View>
    </View>
  );

  const content = (<EventDetail imageShowing event={event} />);

  return (
    <Accordion
      header={header}
      content={content}
      easing="easeOutCubic"
      animationDuration={600}
      underlayColor="#2AE"
    />
  );
};

module.exports = FeedListRow;
