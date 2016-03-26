import React, {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../sharedNative/reducers/reducers.js';
import { refreshUser, getAllUsers } from '../../sharedNative/actions/actions.js';
import socialStyles from '../../styles/Social/socialStyles.js'; // fix this path

const arrayToDataSource = (array = []) => {
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(array)
  );
};

const getAllUsersArray = () => {
  store.dispatch(getAllUsers())
  .then((allUsers) => {
    return allUsers.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
      };
    });
  });
};

const getTruthies = (obj) => Object.keys(obj).filter(key => obj[key]).map(i => +i);

module.exports = {
  arrayToDataSource,
  getAllUsersArray,
  getTruthies,
};
