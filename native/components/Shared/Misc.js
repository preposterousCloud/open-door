import React, {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../sharedNative/reducers/reducers.js';
import { refreshUser, getAllUsers } from '../../sharedNative/actions/actions.js';
import socialStyles from '../../styles/Social/socialStyles.js'; // fix this path

const defaultStyles = StyleSheet.create({ image: { height: 40, width: 40 } });

const LoadingWheel = (props) => {
  const style = props.style || defaultStyles.image;
  return props.isLoading ?
    <Image style={ props.style } source={require('../../sharedNative/images/loading.gif')} /> :
    <View />;
};

LoadingWheel.propTypes = {
  style: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
};

const navTo = (component, focus) => {
  store.getState().navigation.navigator.push({ component, focus });
};

const navToFull = (destination) => {
  store.getState().navigation.navigator.push(destination);
};

const popScene = () => {
  store.getState().navigation.navigator.pop();
};

const exitButton = {
  title: 'X',
  handler: popScene,
};

const backButton = {
  title: 'Back',
  handler: popScene,
};

const cancelButtonNav = {
  title: 'Cancel',
  handler: popScene,
};

const enterButton = (component, focus) => ({
  title: '+',
  handler: navTo.bind(null, component, focus),
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

const makeClickableRow = (action, text) => {
  return (rowData) => {
    const actionAppliedToUser = action.bind(null, rowData);
    return (
      <View>
        <TouchableOpacity
          onPress={actionAppliedToUser}
          style={socialStyles.group}
        >
          <View style={socialStyles.listEntryView}>
            <Text>{rowData.userName || rowData[text]}</Text>
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
  rowComponent: React.PropTypes.func,
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

const makeSelectableRow = (action, getChecklist) => {
  return (user) => {
    let checklist = getChecklist();
    const runList = () => {
      const actionAppliedToUser = action.bind(null, user);
      const appliedChecklist = getChecklist.bind(null, user);
      actionAppliedToUser();
      checklist = appliedChecklist();
      makeListContainer(UserList, ['user', 'friends']);
      store.dispatch(refreshUser());
      console.log(checklist);
    };
    const rowData = () => (
      <View>
        <TouchableOpacity
          onPress={runList}
          style={socialStyles.group}
        >
          <View style={socialStyles.listEntryView}>
            <Text>{user.userName}</Text>
            {(() => (checklist[user.id]) ?
              <View style={socialStyles.checkboxFilled}></View> :
              <View style={socialStyles.checkboxEmpty}></View>
            )()}
          </View>
        </TouchableOpacity>
      </View>
    );
    return rowData();
  };
};

const getAllUsersArray = () => {
  store.dispatch(getAllUsers())
  .then((allUsers) => {
    return allUsers.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
      };
    });
  });
};

const getTruthies = (obj) => Object.keys(obj).filter(key => obj[key]).map(i => +i);

module.exports = {
  exitButton,
  backButton,
  cancelButtonNav,
  navToFull,
  navTo,
  enterButton,
  arrayToDataSource,
  cancelButton,
  makeClickableRow,
  makeSelectableRow,
  UserList,
  makeListContainer,
  LoadingWheel,
  getAllUsersArray,
  popScene,
  getTruthies,
};
