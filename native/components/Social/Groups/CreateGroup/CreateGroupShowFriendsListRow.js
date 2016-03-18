import React, { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../../../styles/Social/socialStyles.js';

const checkboxTest = (val) => {
  console.log('Pressed', val)
}

const CreateGroupShowFriendsListRow = (rowText) => (
   <View>
    <TouchableOpacity
      onPress={checkboxTest}
      style={styles.group}
    >
      <View style={styles.listEntryView}>
        <Text>{rowText}</Text>
        <View style={styles.checkboxEmpty}></View>
      </View>
    </TouchableOpacity>
  </View>
);

module.exports = CreateGroupShowFriendsListRow;
