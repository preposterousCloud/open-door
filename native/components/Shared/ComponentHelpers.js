import React, { Image, ListView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { store } from '../../sharedNative/reducers/reducers.js';
import { refreshUser } from '../../sharedNative/actions/actions.js';
import { arrayToDataSource } from './HelperFunctions.js';
import socialStyles from '../../styles/Social/socialStyles.js'; // fix this path

const LoadingWheel = (props) => {
  const style = props.style || { height: 40, width: 40 };
  return props.isLoading ?
    <Image style={ style } source={require('../../sharedNative/images/loading.gif')} /> :
    <View />;
};

const LoadingWheelContainer = connect(state => {
  return {
    isLoading: state.app.isLoading,
  };})(LoadingWheel);

LoadingWheel.propTypes = {
  style: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
};

const chooseRowStyle = (style) => {
  if (style === 'grey') {
    return [socialStyles.greyedOutListEntryView, socialStyles.greyedOutListEntryViewText];
  } else if (style === 'blue') {
    return [socialStyles.highlightedListEntryView, socialStyles.highlightedListEntryViewText];
  }
};

const makeClickableRow = (action, text, distinguished, rowStyle, canDelete) => {
  const distStyle = distinguished && rowStyle ? chooseRowStyle(rowStyle) : null;
  const contactMapper = store.getState().contactMap;
  return (rowData) => {
    const actionAppliedToUser = action.bind(null, rowData);
    let withDistinguished;
    // Right-side checkmark if already requested
    if (distinguished) {
      withDistinguished = (
        <Text style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
        distStyle[1] :
        null}
        >
          {distinguished && distinguished.indexOf(rowData.id) >= 0 ?
          '✓' :
          null}
        </Text>
      );
    }
    const swipeoutBtns = [
      {
        text: 'Button',
      },
    ];
    let notSwipeable = () => (
      <View>
          <TouchableOpacity
            onPress={actionAppliedToUser}
            style={socialStyles.group}
          >
            <View style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[0] :
              socialStyles.listEntryView}
            >
              <Text style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[1] :
              null}
              >
                {rowData.userName ? (contactMapper[rowData.id] || rowData.userName) : rowData[text]}
              </Text>
              {withDistinguished}
            </View>
          </TouchableOpacity>
      </View>
    );
    let swipeable = () => (
      <View>
        <Swipeout
          right={swipeoutBtns}
        >
          <TouchableOpacity
            onPress={actionAppliedToUser}
            style={socialStyles.group}
          >
            <View style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[0] :
              socialStyles.listEntryView}
            >
              <Text style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[1] :
              null}
              >
                {rowData.userName ? (contactMapper[rowData.id] || rowData.userName) : rowData[text]}
              </Text>
              {withDistinguished}
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
    return canDelete ? swipeable() : notSwipeable();
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

const makeListContainer = (rowComponent, listDataPath = [], listComponent = UserList) => {
  return connect(state => ({
    listComponent,
    rowComponent,
    listData: listDataPath.reduce((subState, prop) => subState[prop], state),
    user: state.user,
  }))(listComponent);
};

const makeSelectableRow = (action, getChecklist) => {
  const contactMapper = store.getState().contactMap;
  return (user) => {
    let checklist = getChecklist();
    const runList = () => {
      const actionAppliedToUser = action.bind(null, user);
      const appliedChecklist = getChecklist.bind(null, user);
      actionAppliedToUser();
      checklist = appliedChecklist();
      makeListContainer(UserList, ['user', 'friends']);
      store.dispatch(refreshUser());
    };
    const rowData = () => (
      <View>
        <TouchableOpacity
          onPress={runList}
          style={socialStyles.group}
        >
          <View style={socialStyles.listEntryView}>
            <Text>{contactMapper[user.id] || user.userName}</Text>
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

module.exports = {
  makeClickableRow,
  makeSelectableRow,
  UserList,
  makeListContainer,
  LoadingWheelContainer,
};
