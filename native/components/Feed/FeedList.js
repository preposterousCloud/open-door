import React, { View, ListView } from 'react-native';
import FeedListRow from './FeedListRow.js';
import { arrayToDataSource } from '../Shared/HelperFunctions.js';
import styles from '../../styles/styles.js';

const FeedList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={arrayToDataSource(props.events)}
      renderRow={FeedListRow}
      style={styles.listView}
    />
  </View>
);

FeedList.propTypes = {
  events: React.PropTypes.array,
};

module.exports = FeedList;
