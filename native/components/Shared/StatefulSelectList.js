import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../sharedNative/actions/actions';
import { arrayToDataSource } from '../Shared/Misc';
import socialStyles from '../../styles/Social/socialStyles.js';
import doorStyles from '../../styles/Door/doorStyles.js';

const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: {},
      dataArray: props.dataArray,
      inviteFunc: props.inviteFunc,
    };
    this.ItemView = this.ItemView.bind(this);
  }
  ItemView(rowData) {
    const clickThisRow = () => {
      rowData.checked = !rowData.checked;
      this.state.inviteFunc(rowData.id);
      this.forceUpdate();
    };
    const Checkbox = (props) => {
      return (props.checked ?
        <View style={socialStyles.checkboxFilled} /> :
        <View style={socialStyles.checkboxEmpty} />);
    };
    return (
      <TouchableOpacity
        onPress={clickThisRow}
        style={socialStyles.group}
      >
        <View style={socialStyles.listEntryView}>
          <Text>{rowData[this.props.displayProp]}</Text>
          <Checkbox checked={rowData.checked}/>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const logState = () => {
      console.log('selectedUsers:', JSON.stringify(this.state.selectedUsers));
    };
    return (
      <View>
        <ListView
          dataSource={ arrayToDataSource(this.state.dataArray) }
          renderRow={this.ItemView}
          style={doorStyles.listView}
        />
      </View>
    );
  }
};

SelectList.propTypes = {
  dataArray: React.PropTypes.array,
  displayProp: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

const addCheckedProp = (dataArray = []) => dataArray.map(datum => ({ ...datum, checked: false }));

export const UserList = connect(
  (state, ownProps) => {
    return {
      inviteFunc: ownProps.inviteFunc,
      dataArray: addCheckedProp(state.user.friends),
      displayProp: 'userName',
    };
  },
  (dispatch, ownProps) => {
    return {
      onClick: (itemData) =>
        dispatch(actions.toggleItemSelectionInList(itemData.id, 'friendsToInvite')),
    };
  }
)(SelectList);

export const GroupList = connect(
  (state, ownProps) => {
    return {
      inviteFunc: ownProps.inviteFunc,
      dataArray: addCheckedProp(state.user.Groups),
      displayProp: 'name',
    };
  },
  (dispatch, ownProps) => {
    return {
      onClick: (itemData) =>
        dispatch(actions.toggleItemSelectionInList(itemData.id, 'groupsToInvite')),
    };
  }
)(SelectList);
