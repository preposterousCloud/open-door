import styles from '../../styles/Feed/feedStyles.js';
import FeedListRow from './FeedListRow.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
 } from 'react-native';

const MOCK_ROW_DATA = [
  'aardvark',
  'baboon',
  'condor',
  'dugong',
  'elephant',
  'flamingo',
  'giraffe',
  'hippo',
  'ibex',
];

store.dispatch({
  type: 'SET_MOCK_DATA',
  data: MOCK_ROW_DATA,
});

const a = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
}).cloneWithRows(store.getState().mockData);

const FeedList = () => (
  <View style={styles.container}>
    <ListView
      dataSource={a}
      renderRow={FeedListRow}
      style={styles.listView}
    />
  </View>
);

module.exports = FeedList;
