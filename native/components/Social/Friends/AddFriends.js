import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import friendsApi from '../../sharedNative/utils/friends.js';
// import usersApi from '../../sharedNative/utils/users.js';

const AddFriends = (props) => {
  const something = () => {
    console.log('form submit!');
  };

  const leftNavButton = {
    title: 'X',
    handler: store.getState().navigation.navigator.jumpBack,
  };

  let userName;
  const updateUserName = newUserName => { userName = newUserName; };

  const convertArrayToDatasource = (array, prop) => {
    array = array || [];
    if (prop) {
      array = array.map(item => item[prop]);
    }

    return (new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2 }
      ).cloneWithRows(array)
    );
  };

  const allUsers = [
    { id: 2, userName: 'user2' },
    { id: 3, userName: 'user3' },
    { id: 4, userName: 'user4' },
  ];


  const alertRequestSent = (user) => {
    Alert.alert(
      `${user.userName} added to Friends!`,
      `Their ID: ${user.id}, your ID:${store.getState().user.id}`,
      ['hey', 'ho']
    );
  };

  const addFriend = (user) => {
    alertRequestSent(user);
  };

  const UserRow = (rowData) => {
    const addThisFriend = addFriend.bind(null, rowData);

    return (
      <TouchableOpacity onPress={addThisFriend}>
        <Text>{rowData.userName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <NavBar
        title={ 'Add Friend' }
        leftButton={leftNavButton}
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
      <ListView
        dataSource={convertArrayToDatasource(allUsers)}
        renderRow={UserRow}
        style={feedStyles.listView}
      />
    </View>
  );
};

module.exports = AddFriends;
