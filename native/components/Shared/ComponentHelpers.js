import React, { Image, ListView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { store } from '../../sharedNative/reducers/reducers.js';
import { refreshUser } from '../../sharedNative/actions/actions.js';
import { arrayToDataSource } from './HelperFunctions.js';
import styles, { checkbox, checkboxFilled } from '../../styles/styles.js';

const LoadingWheel = (props) => {
  const style = props.style || { height: 150, width: 150 };
  return props.isLoading ?
    <Image style={ style } source={require('../../sharedNative/images/loading.gif')} /> :
    <View />;
};

const LoadingWheelContainer = connect(state => {
  return {
    isLoading: state.app.isLoading,
  };})(LoadingWheel);

LoadingWheel.propTypes = {
  style: React.PropTypes.any,
  isLoading: React.PropTypes.bool,
};

const chooseRowStyle = (style) => {
  if (style === 'grey') {
    return [styles.greyedOutListEntryView, styles.greyedOutListEntryViewText];
  } else if (style === 'blue') {
    return [styles.highlightedListEntryView, styles.highlightedListEntryViewText];
  }
};

const makeClickableRow = (action, text, distinguished, rowStyle, swipeFunction) => {
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

    const ClickableRow = () => (
      <View>
          <TouchableOpacity
            onPress={actionAppliedToUser}
            style={styles.group}
          >
            <View style={distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[0] :
              styles.listEntryView}
            >
              <Text style={[styles.white, (distinguished && distinguished.indexOf(rowData.id) >= 0 ?
              distStyle[1] :
              null)]}
              >
                {rowData.userName ? (contactMapper[rowData.id] || rowData.userName) : rowData[text]}
              </Text>
              {withDistinguished}
            </View>
          </TouchableOpacity>
      </View>
    );

    if (swipeFunction) {
      const swipeoutBtns = [{
        text: 'Remove',
        onPress: () => store.dispatch(swipeFunction(rowData.id)),
      }];
      const SwipeAndClickRow = () => (
        <View>
          <Swipeout right={swipeoutBtns} >
            <ClickableRow />
          </Swipeout>
        </View>
      );
      return <SwipeAndClickRow />;
    }
    return <ClickableRow />;
  };
};

const UserList = (props) => (
  <View style={styles.container}>
    <ListView
      dataSource={arrayToDataSource(props.listData)}
      renderRow={props.rowComponent}
      style={styles.listView}
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
      action(user);
      checklist = getChecklist();
      // Warning - somehow refresh user makes this work - DONT REMOVE
      store.dispatch(refreshUser());
    };
    const rowData = () => (
      <View>
        <TouchableOpacity
          onPress={runList}
          style={styles.group}
        >
          <View style={styles.listEntryView}>
            <Text style={styles.white} >{contactMapper[user.id] || user.userName}</Text>
            <View style={[checkbox, checklist[user.id] && checkboxFilled]} />
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
