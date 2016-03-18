import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import AddFriends from './AddFriends.js';

const Friends = (props) => {
  const leftNavButton = {
    title: 'X',
    handler: store.getState().navigation.navigator.pop,
  };

  const navToAddFriends = () => {
    store.getState().navigation.navigator.push({ component: AddFriends });
  };

  const rightNavButton = {
    title: '+',
    handler: navToAddFriends,
  };

  const convertArrayToDatasource = (array, prop) => {
    array = array || [];
    if (prop) {
      array = array.map(item => item[prop]);
    }

    return (new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2 }
      ).cloneWithRows(array)
    );
  };

  const UserRow = (rowData) => {
    const clickThisRow = () => console.log('clicked', rowData);
    return (
      <TouchableOpacity onPress={clickThisRow}>
        <Text>{rowData.userName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <NavBar
        title={ 'Friends' }
        leftButton={leftNavButton}
        rightButton={rightNavButton}
      />
      <ListView
        dataSource={convertArrayToDatasource(props.route.passProps.user.friends)}
        renderRow={UserRow}
        style={feedStyles.listView}
      />
    </View>
  );
};

module.exports = Friends;
