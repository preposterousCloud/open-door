import React, { View, Text, TouchableOpacity, TextInput, } from 'react-native';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions');
import styles from '../../../../styles/Social/socialStyles.js';

const CreateGroupName = (props) => {
  const something = () => {
    console.log(groupName);
  };

  let groupName;

  const confirmNewGroup = () => {
    const finalGroupName = store.getState().groupName
    console.log('CALLING NAME GROUP WITH', finalGroupName);
    store.dispatch(actions.storeGroup(finalGroupName));
  }

  const updateGroupName = (newGroupName) => {
    groupName = newGroupName;
    store.dispatch(actions.liveUpdateGroupName(groupName));
    console.log('>', store.getState().groupName)
  };

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
        onSubmitEditing={confirmNewGroup}
      />
    </View>
  );
};

module.exports = CreateGroupName;
