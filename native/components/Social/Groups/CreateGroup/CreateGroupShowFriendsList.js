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

const convertAllUsersToDataSource = (users) => {
  console.log('CGSFL', users)
  users = users || [];
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(users.map(user => user.userName))
  );
};

const CreateGroupShowFriendsList = (props) => {
  console.log('PROPS', props)
  return (
    <View style={styles.container}>
      <ListView
        dataSource={convertAllUsersToDataSource(props.users)}
        renderRow={CreateGroupShowFriendsListRow}
        style={styles.listView}
      />
    </View>
  );
}

module.exports = CreateGroupShowFriendsList;
