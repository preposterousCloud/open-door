import React, { View, Text, TouchableOpacity, TextInput, } from 'react-native';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
import styles from '../../../../styles/Social/socialStyles.js';

const CreateGroupName = (props) => {
  const something = () => {
    console.log(groupName);
  };

  let groupName;
  const updateGroupName = newGroupName => { groupName = newGroupName; };

  return (
    <View>
      <TextInput
        autoCapitalize={'sentences'}
        autoCorrect={false}
        maxLength={32}
        placeholder={'Group Name'}
        value={groupName}
        style={styles.userInput}
        returnKeyType={'done'}
        onChangeText={updateGroupName}
        onSubmitEditing={something}
      />
    </View>
  );
};

module.exports = CreateGroupName;
