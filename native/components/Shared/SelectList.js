import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../sharedNative/actions/actions';
import socialStyles from '../../styles/Social/socialStyles.js';

const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.ItemView = this.ItemView.bind(this);
  }
  componentWillMount() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  ItemView(rowData) {
    return (
      <TouchableOpacity onPress={this.props.onClick.bind(null, rowData)} style={socialStyles.group}>
        <View style={socialStyles.listEntryView}>
          <Text>{rowData[this.props.itemPropertyToDisplay]}</Text>
           {(() => (this.props.pendingSelections[this.props.pendingSelectionsProperty][rowData.id]) ?
              <View style={socialStyles.checkboxFilled} /> :
              <View style={socialStyles.checkboxEmpty} />
           )()}
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <ListView 
          dataSource={ this.props.itemsToSelectFrom }
          renderRow={this.ItemView}
        />
      </View>
    );
  }
};

export const UserList = connect(
  (state, ownProps) => {
    return {
      itemsToSelectFrom: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(state.user.friends),
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
      itemsToSelectFrom: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(state.user.Groups),
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