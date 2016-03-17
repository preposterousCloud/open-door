import React, {
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
 } from 'react-native';

import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';

import styles from '../../../../styles/Social/socialStyles.js';
import CreateGroupShowFriendsListRow from './CreateGroupShowFriendsListRow.js';

const convertGroupsToDataSource = (groups) => {
  groups = groups || [];
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(groups.map(group => group.name))
  );
};

const CreateGroupShowFriendsList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={convertGroupsToDataSource(props.groups)}
      renderRow={CreateGroupShowFriendsListRow}
      style={styles.listView}
    />
  </View>
);

module.exports = CreateGroupShowFriendsList;
