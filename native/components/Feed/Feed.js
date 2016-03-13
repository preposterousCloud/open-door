import styles from '../../styles/Feed/feedStyles.js';
import FeedListRow from './FeedListRow.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavigationBar from 'react-native-navbar';
import React, {
  Text,
  View,
  ListView,
  Component,
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

const Feed = () => (
  <View style={styles.container}>
    <NavigationBar
      title="Hey Whatsup Hello"
    />
    <ListView
      dataSource={a}
      renderRow={FeedListRow}
      style={styles.listView}
    />
  </View>
);

module.exports = Feed;
