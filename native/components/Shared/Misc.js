import { connect } from 'react-redux';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import socialStyles from '../../styles/Social/socialStyles.js'; // fix this path

const exitButton = {
  title: 'X',
  handler: () => { store.getState().navigation.navigator.pop(); },
};

const navTo = (component) => {
  store.getState().navigation.navigator.push({ component });
};

const enterButton = (component) => ({
  title: '+',
  handler: navTo.bind(null, component),
});

const arrayToDataSource = (array = []) => {
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
          style={socialStyles.group}
        >
          <View style={socialStyles.listEntryView}>
            <Text>{user.userName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
};

const UserList = (props) => (
  <View style={socialStyles.container}>
    <ListView
      dataSource={arrayToDataSource(props.listData)}
      renderRow={props.rowComponent}
      style={socialStyles.listView}
    />
  </View>
);

UserList.propTypes = {
  listData: React.PropTypes.array,
  rowComponent: React.PropTypes.element,
  user: React.PropTypes.object,
};

const getPropFrom = (obj, propArr) => (propArr.reduce((subObj, prop) => subObj[prop], obj));

const makeListContainer = (rowComponent, listDataPath = [], listComponent = UserList) => {
  return connect(state => ({
    listComponent,
    rowComponent,
    listData: listDataPath.reduce((subState, prop) => subState[prop], state),
    user: state.user,
  }))(listComponent);
};

module.exports = {
  exitButton,
  navTo,
  enterButton,
  arrayToDataSource,
  cancelButton,
  makeClickableRow,
  UserList,
  makeListContainer,
};
