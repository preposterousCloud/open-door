import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
import NavBar from '../../../Shared/NavBar.js';
import styles from '../../../../styles/Social/socialStyles.js';
import feedStyles from '../../../../styles/Feed/feedStyles.js';
import { getAllUsers, addFriendToGroup } from '../../../../sharedNative/actions/actions.js';
import { makeClickableRow, UserList } from '../../../Shared/ComponentHelpers.js';
import { exitButton, cancelButton } from '../../../Shared/Buttons.js';

const AddMembers = (props) => {
  const contactMapper = store.getState().contactMap;
  // Begin TextInput methods
  const something = () => {
    console.log('form submit!');
  };

  let userName;
  const updateUserName = newUserName => { userName = newUserName; };

  const cancelButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };

  const alertRequestSent = (user) => {
    Alert.alert(`add member ${contactMapper[user.id] || user.userName}?`, '', [
      cancelButton,
      { text: 'Add',
        onPress: () => {
          const groupId = props.route.focus.id;
          const friendId = user.id;
          store.dispatch(addFriendToGroup(groupId, friendId));
        },
        style: 'default',
      },
    ]);
  };
  // End TextInput methods

  const AddMembersListContainer = connect(state => ({
    listComponent: UserList,
    rowComponent: makeClickableRow(alertRequestSent),
    listData: state.user.friends,
    user: state.user,
  }))(UserList);

  return (
    <View>
      <NavBar
        title={ 'Add Members' }
        leftButton={exitButton}
      />
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        maxLength={16}
        placeholder={'userName'}
        value={userName}
        style={styles.userInput}
        returnKeyType={'go'}
        onChangeText={updateUserName}
        onSubmitEditing={something}
      />
      <AddMembersListContainer />
    </View>
  );
};

module.exports = AddMembers;
