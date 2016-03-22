import React, {
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
} from 'react-native';
import FeedListRow from './FeedListRow.js';
import styles from '../../styles/Feed/feedStyles.js';

const convertEventsToDataSource = (events) => {
  events = events || [];
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(events.map(event => event.name))
  );
};

const FeedList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={convertEventsToDataSource(props.events)}
      renderRow={FeedListRow}
      style={styles.listView}
    />
  </View>
);

module.exports = FeedList;
