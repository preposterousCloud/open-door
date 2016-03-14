import styles from '../../styles/Feed/feedStyles.js';
import FeedListRow from './FeedListRow.js';
import FeedNavbar from './FeedNavbar.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import NavigationBar from 'react-native-navbar';
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

const pageTitle = (
  <Text style={styles.pageTitle}>Hey Whatsup Hello</Text>
);
const exampleFunction = () => { console.log('im in love with the cocoa'); };

const backButton = (
  <TouchableHighlight onPress={exampleFunction} underlayColor={'white'}>
    <Text>Hey!</Text>
  </TouchableHighlight>
);

const addButton = (
  <TouchableHighlight onPress={exampleFunction} underlayColor={'white'}>
    <Text>Ho!</Text>
  </TouchableHighlight>
);

const Feed = () => (
  <View style={styles.container}>
    <FeedNavbar />
    <ListView
      dataSource={a}
      renderRow={FeedListRow}
      style={styles.listView}
    />
  </View>
);

module.exports = Feed;
