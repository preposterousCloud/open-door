import React, { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions');
import styles from '../../../../styles/styles.js';

const CreateGroupName = (props) => {
  return (
    <View>
      <TextInput
        autoCapitalize={'sentences'}
        autoCorrect={false}
        maxLength={32}
        placeholder={'Group Name'}
        value={props.groupName}
        style={styles.userInput}
        returnKeyType={'done'}
        onChangeText={ props.onUpdate }
        onSubmitEditing={ props.onSubmit }
      />
    </View>
  );
};

CreateGroupName.propTypes = {
  groupName: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

module.exports = CreateGroupName;
