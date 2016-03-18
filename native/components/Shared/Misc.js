import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import styles from '../../../styles/Social/socialStyles.js'; // fix this path

const exitButton = {
  title: 'X',
  handler: store.getState().navigation.navigator.jumpBack,
};

const navTo = (component) => {
  store.getState().navigation.navigator.push({ component });
};

const enterButton = (component) => ({
  title: '+',
  handler: navTo.bind(null, component),
});

const convertArrayToDatasource = (array = []) => {
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(array)
  );
};

const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const makeClickableRow = (action) => {
  return (user) => {
    const actionAppliedToUser = action.bind(null, user);
    return (
      <View>
        <TouchableOpacity
          onPress={actionAppliedToUser}
          style={styles.group}
        >
          <View style={styles.listEntryView}>
            <Text>{user.userName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
};

const UserList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={convertArrayToDatasource(props.list)}
      renderRow={props.rowComponent}
      style={styles.listView}
    />
  </View>
);

UserList.propTypes = {
  list: React.PropTypes.array,
  rowComponent: React.PropTypes.element,
};

module.exports = {
  exitButton,
  navTo,
  enterButton,
  convertArrayToDatasource,
  cancelButton,
  makeClickableRow,
  UserList,
};
