import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
const { width, height } = Dimensions.get('window');
import Accordion from 'react-native-accordion';
import EventDetail from './EventDetail';
import CirclePic from '../Shared/CirclePic';
import { store } from '../../sharedNative/reducers/reducers.js';

const FeedListRow = (event) => {
  // Dirty hack - I'm sorry :(
  const contactMapper = store.getState().contactMap;
  
  const header = (
    <View>
      <View style={[styles.listEntryView, { flexDirection: 'row', alignItems: 'center', padding: 15 }]}>
        <Text style={styles.standardText}> {event.name} </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.standardText}> { contactMapper[event.hostUser.id] || event.hostUser.userName} </Text>
          <CirclePic source={ { uri: event.hostUser.profilePictureUri }} size={40} />
        </View>
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
