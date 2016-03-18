import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import friendsApi from '../../../sharedNative/utils/friends.js';
import { getAllUsers } from '../../../sharedNative/actions/actions.js';

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


  const getAllUsersArray = () => {
    console.log('getting all users');
    store.dispatch(getAllUsers())
    .then((allUsers) => {
      console.log('allUsers:', allUsers);
      return allUsers.map((user) => {
        return {
          id: user.id,
          userName: user.userName,
        };
      });
    });
  };

  const AddFriendsListRow = (user) => (
    <View>
      <View style={styles.listEntryView}>
        <TouchableOpacity
          onPress={() => {
            console.log('user clikced!', user.userName);
          }}
          style={styles.group}
        >
          <Text>{user.userName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const convertAllUsersToDataSource = (users) => {
    users = users || [];
    return (new ListView.DataSource(
        { rowHasChanged: (row1, row2) => row1 !== row2 }
      ).cloneWithRows(users)
    );
  };

  const AddFriendsList = (props) => {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={convertAllUsersToDataSource(props.users)}
          renderRow={AddFriendsListRow}
          style={styles.listView}
        />
      </View>
    );
  };

  // CHANGE ONCE FRIENDS FEATURE IS IMPLEMENTED
  const AddFriendsListContainer = connect(state => {
    return {
      users: state.allUsers,
    };
  })(AddFriendsList);


  const allUsers = getAllUsersArray();

  const cancelButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };

  const alertRequestSent = (user) => {
    Alert.alert(`add friend ${user.userName}?`, '', [
      cancelButton,
      { text: 'Add',
        onPress: () => store.dispatch(friendsApi.addFriend(user.id)),
        style: 'default',
      },
    ]);
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
      <AddFriendsListContainer />
    </View>
  );
};

module.exports = AddFriends;
