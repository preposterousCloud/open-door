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
import styles from '../../styles/styles.js'; // fix this path

const arrayToDataSource = (array = []) => {
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(array)
  );
};

const getAllUsersArray = () => {
  return store.dispatch(getAllUsers());
};

const getTruthies = (obj) => Object.keys(obj).filter(key => obj[key]).map(i => +i);

module.exports = {
  arrayToDataSource,
  getAllUsersArray,
  getTruthies,
};
