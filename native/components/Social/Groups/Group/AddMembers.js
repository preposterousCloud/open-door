import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
import NavBar from '../../../Shared/NavBar.js';
import styles from '../../../../styles/styles.js';
import { getAllUsers, addFriendToGroup } from '../../../../sharedNative/actions/actions.js';
import { makeClickableRow, UserList } from '../../../Shared/ComponentHelpers.js';
import { exitButton } from '../../../Shared/Buttons.js';
import { SelectList } from '../../../Shared/StatefulSelectList.js';
import { BackgroundImage } from '../../../Shared/BackgroundImage';

// remove and import cancelButton from Buttons
const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const filterFriends = (friends, groupMembers) => {
  const memberIds = groupMembers.map(member => member.id);
  return friends.filter(friend => memberIds.indexOf(friend.id) === -1);
};

const AddMembersListContainer = connect((state, ownProps) => {
  return {
    listComponent: UserList,
    rowComponent: makeClickableRow(ownProps.onRowClick, 'userName'),
    listData: filterFriends(state.user.friends, state.userGroupMembers),
    user: state.user,
  };
})(UserList);

const AddMembers = class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.contactMapper = store.getState().contactMap;
    this.state = {
      userName: '',
    };
    this.alertRequestSent = this.alertRequestSent.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  something() {
    console.log('form submit!');
  }
  onSearchChange(newVal) {
    this.setState({
      userName: newVal,
    });
  }
  alertRequestSent(user) {
    Alert.alert(`add member ${this.contactMapper[user.id] || user.userName}?`, '', [
      cancelButton,
      { text: 'Add',
        onPress: () => {
          const groupId = this.props.route.focus.id;
          const friendId = user.id;
          store.dispatch(addFriendToGroup(groupId, friendId));
        },
        style: 'default',
      },
    ]);
  }
  render() {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedText}> GROUPS </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              maxLength={16}
              placeholder={'userName'}
              value={this.state.userName}
              style={styles.userInput}
              returnKeyType={'go'}
              onChangeText={this.updateUserName}
              onSubmitEditing={this.something}
            />
            <AddMembersListContainer onRowClick={this.alertRequestSent} />
          </View>
          <NavBar
            leftButton={exitButton}
            style={styles.feedNavBar}
          />
        </View>
      </BackgroundImage>
    );
  }
};

AddMembers.propTypes = {
  route: React.PropTypes.object,
};

module.exports = AddMembers;
