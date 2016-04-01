import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
const { width, height } = Dimensions.get('window');
import Accordion from 'react-native-accordion';
import EventDetail from './EventDetail';
import EventInvitees from './EventInvitees';
import CirclePic from '../Shared/CirclePic';
import { store } from '../../sharedNative/reducers/reducers.js';

const FeedListRow = (event) => {
  // Dirty hack - I'm sorry :(
  const contactMapper = store.getState().contactMap;
  
  const header = (
    <View style={styles.feedListRow}>
      <View style={styles.feedListEntryView}>
        <CirclePic
          source={ { uri: event.hostUser.profilePictureUri }}
          size={60}
          style={styles.feedEventHostPic}
        />
      </View>
      <View style={styles.feedListEntryTextView}>
        <Text style={styles.rowHeader}> {event.name.toUpperCase()} </Text>
        <Text style={styles.standardText}> { contactMapper[event.hostUser.id] || event.hostUser.userName} </Text>
        <EventInvitees event={event} />
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
      underlayColor="#0002"
    />
  );
};

module.exports = FeedListRow;
