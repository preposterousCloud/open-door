import React, { View, Text, TouchableOpacity, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../sharedNative/reducers/reducers.js';
import NavBar from '../../Shared/NavBar.js';
import styles from '../../../styles/Social/socialStyles.js';
import feedStyles from '../../../styles/Feed/feedStyles.js';
import friendsApi from '../../../sharedNative/utils/friends.js';
import { setFilterText, clearFilterText } from '../../../sharedNative/actions/actions.js';
import {
  exitButton,
  cancelButton,
  makeClickableRow,
  UserList,
  getAllUsersArray,
} from '../../Shared/Misc.js';

class FilterTextInput extends React.Component {
  componentDidMount() {
    store.dispatch(clearFilterText());
  }

  filterUsers(text) {
    store.dispatch(setFilterText(text));
  }

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={16}
          placeholder={'userName'}
          style={styles.userInput}
          returnKeyType={'go'}
          onChangeText={this.filterUsers}
        />
      </View>
    );
  }
}
const AddFriends = (props) => {
  // Begin TextInput methods
  const something = () => {
    console.log('form submit!');
  };

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

  // End TextInput methods
  const allUsers = getAllUsersArray();

  const AddFriendsListContainer = connect(state => {
    console.log('state\'s filter text:', state.filterText);
    const filterIds = state.user.friends ?
      state.user.friends.map(friend => friend.id).concat(state.user.id) : [];
    const targetUsers = state.allUsers.filter(targetUser => (filterIds.indexOf(targetUser.id) < 0));
    return {
      listComponent: UserList,
      rowComponent: makeClickableRow(alertRequestSent),
      listData: targetUsers,
      user: state.user,
    };
  })(UserList);

  return (
    <View>
      <NavBar
        title={ 'Add Friend' }
        leftButton={exitButton}
      />
      <FilterTextInput />
      <AddFriendsListContainer />
    </View>
  );
};

module.exports = AddFriends;
