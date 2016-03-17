import React, { View, Text, TouchableOpacity, TextInput, ListView } from 'react-native';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
// import friendsApi from '../../sharedNative/utils/friends.js';
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
  const addFriend = () => {
    const friend1id = store.getState().user.id;
    const friend2id = 4;
    // friendsApi.createFriendship(friend1id, friend2id);
  };

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

  const allUsers = ['gret', 'graic']; // get all users from api

  const UserRow = (rowText) => <Text>{rowText}</Text>;

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
