import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../sharedNative/actions/actions';
import styles from '../../styles/styles.js';

const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.ItemView = this.ItemView.bind(this);
  }
  componentWillMount() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  ItemView(rowData) {
    const clickThisRow = this.props.onClick.bind(null, rowData);
    const checked = this.props.pendingSelections[this.props.pendingSelectionsProperty][rowData.id];
    return (
      <TouchableOpacity
        onPress={clickThisRow}
        style={styles.group}
      >
        <View style={styles.listEntryView}>
          <Text>{rowData[this.props.itemPropertyToDisplay]}</Text>
          <View style={[styles.checkbox, checked && styles.checkboxFilled]} />
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
          style={styles.listView}
        />
      </View>
    );
  }
};

SelectList.propTypes = {
  itemsToSelectFrom: React.PropTypes.object,
  itemPropertyToDisplay: React.PropTypes.string,
  pendingSelectionsProperty: React.PropTypes.string,
  pendingSelections: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export const UserList = connect(
  (state, ownProps) => {
    return {
      itemsToSelectFrom: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows(state.user.friends || []),
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
