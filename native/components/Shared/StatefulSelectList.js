import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../sharedNative/actions/actions';
import { arrayToDataSource } from '../Shared/HelperFunctions.js';
import socialStyles from '../../styles/Social/socialStyles.js';
import doorStyles from '../../styles/Door/doorStyles.js';

const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: props.preSelected || {},
      dataArray: props.dataArray,
      inviteFunc: props.inviteFunc,
    };
    this.ItemView = this.ItemView.bind(this);
  }
  ItemView(rowData) {
    const clickThisRow = () => {
      const selectedUsers = this.state.selectedUsers;
      selectedUsers[rowData.id] = !selectedUsers[rowData.id];
      this.setState({ selectedUsers });
      this.state.inviteFunc(rowData.id);
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
          <Checkbox checked={this.state.selectedUsers[rowData.id]} />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
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
  preSelected: React.PropTypes.object,
  inviteFunc: React.PropTypes.func,
};

export const UserList = connect(
  (state, ownProps) => {
    return {
      inviteFunc: ownProps.inviteFunc,
      dataArray: state.user.friends,
      displayProp: 'userName',
      preSelected: ownProps.preSelected,
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
      dataArray: state.user.Groups,
      displayProp: 'name',
      preSelected: ownProps.preSelected,
    };
  },
  (dispatch, ownProps) => {
    return {
      onClick: (itemData) =>
        dispatch(actions.toggleItemSelectionInList(itemData.id, 'groupsToInvite')),
    };
  }
)(SelectList);
