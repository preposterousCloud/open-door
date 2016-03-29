import React, {
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
} from 'react-native';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
const actions = require('../../../sharedNative/actions/actions');
import GroupsListRow from './GroupsListRow.js';
import styles from '../../../styles/Social/socialStyles.js';

const convertGroupsToDataSource = (groups) => {
  groups = groups || [];
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(groups.map(group => group.name))
  );
};

const GroupsList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={convertGroupsToDataSource(props.groups)}
      renderRow={GroupsListRow}
      style={styles.listView}
    />
  </View>
);

GroupsList.propTypes = {
  groups: React.PropTypes.array,
};

module.exports = GroupsList;
