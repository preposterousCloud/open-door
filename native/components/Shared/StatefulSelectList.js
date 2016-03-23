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
      itemsToSelectFrom: props.itemsToSelectFrom
    };
    this.ItemView = this.ItemView.bind(this);
  }
  ItemView(rowData) {
    const clickThisRow = () => {
      rowData.checked = !rowData.checked;
      this.setState();
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
          <Text>{rowData[this.props.itemPropertyToDisplay]}</Text>
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
        <TouchableOpacity onPress={logState}><Text>LogState</Text></TouchableOpacity>
        <ListView
          dataSource={ arrayToDataSource(this.state.itemsToSelectFrom) }
          renderRow={this.ItemView}
          style={doorStyles.listView}
        />
      </View>
    );
  }
};

SelectList.propTypes = {
  itemsToSelectFrom: React.PropTypes.array,
  itemPropertyToDisplay: React.PropTypes.string,
  pendingSelectionsProperty: React.PropTypes.string,
  pendingSelections: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export const UserList = connect(
  (state, ownProps) => {
    const friendsWithChecks = state.user.friends.map(friend => ({
      ...friend,
      checked: false,
    }));
    return {
      itemsToSelectFrom: friendsWithChecks || [],
      pendingSelections: state.app.pendingSelections,
      pendingSelectionsProperty: 'friendsToInvite',
      itemPropertyToDisplay: 'userName',
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
      itemsToSelectFrom: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(state.user.Groups || []),
      pendingSelections: state.app.pendingSelections,
      pendingSelectionsProperty: 'groupsToInvite',
      itemPropertyToDisplay: 'name',
    };
  },
  (dispatch, ownProps) => {
    return {
      onClick: (itemData) =>
        dispatch(actions.toggleItemSelectionInList(itemData.id, 'groupsToInvite')),
    };
  }
)(SelectList);
