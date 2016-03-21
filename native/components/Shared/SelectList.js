import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const actions = require('../../sharedNative/actions/actions');

const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.ItemView = this.ItemView.bind(this);
  }
  // componentWillReceiveProps() {
  //   // Clear any existing pending friends state just in case

  // }
  // onItemClick() {
  //   // Dispatch setFriendToggle
  //   //
  // }
  componentWillMount() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  ItemView(rowData) {
    return (
      <TouchableOpacity onPress={this.props.onClick.bind(null, rowData)}>
        <Text>
          {rowData.userName}
          {this.props.pendingSelections['friendsToInvite'][rowData.id] ? 'Selected' : 'Not'} 
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <ListView 
          dataSource={ this.props.usersToSelectFrom }
          renderRow={this.ItemView}
        />
      </View>
    );
  }
};

export const UserList = connect(
  (state, ownProps) => {
    return {
      usersToSelectFrom: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(state.user.friends),
      pendingSelections: state.app.pendingSelections,
    };
  },
  (dispatch, ownProps) => {
    return {
      onClick: (itemData) => 
        dispatch(actions.toggleItemSelectionInList(itemData.id, 'friendsToInvite')),
    };
  }
)(SelectList);
