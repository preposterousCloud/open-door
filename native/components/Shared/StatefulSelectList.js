import React, { ListView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../sharedNative/actions/actions';
import { arrayToDataSource } from '../Shared/HelperFunctions.js';
import styles from '../../styles/styles.js';

export const SelectList = class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.preSelected || {},
      dataArray: props.dataArray,
    };
    this.ItemView = this.ItemView.bind(this);
  }
  ItemView(rowData) {
    const clickThisRow = () => {
      const selectedItems = this.state.selectedItems;
      selectedItems[rowData.id] = !selectedItems[rowData.id];
      this.setState({ selectedItems });
      this.props.onItemClick(rowData);
    };
    return (
      <TouchableOpacity
        onPress={clickThisRow}
        style={styles.group}
      >
        <View style={styles.listEntryView}>
          <Text>{rowData[this.props.displayProp]}</Text>
          <View
            style={[styles.checkbox, this.state.selectedItems[rowData.id] && styles.checkboxFilled]}
          />
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
          style={styles.listView}
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
  onItemClick: React.PropTypes.func,
};

export const UserList = connect(
  (state, ownProps) => {
    return {
      onItemClick: ownProps.onItemClick,
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
      onItemClick: ownProps.onItemClick,
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
