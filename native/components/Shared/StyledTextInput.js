import React, { View, Text, TextInput } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { setFilterText, clearFilterText } from '../../sharedNative/actions/actions.js';
import styles from '../../styles/styles.js';


// things it shoudl be passed:
  // onChangeText, placeholder
  // defaultValue={props.}
const StyledTextInput = (props) => (
  <View>
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={false}
      maxLength={props.maxLength || 25}
      placeholder={props.placeholder || ''}
      value={props.value || undefined}
      style={styles.userInput}
      returnKeyType={props.returnKeyType || 'go'}
      onChangeText={props.onChangeText || (() => null)}
      keyboardType={props.keyboardType || 'default'}
      onSubmitEditing={props.onSubmitEditing}
      secureTextEntry={props.secureTextEntry || false}
    />
  </View>
);

StyledTextInput.propTypes = {
  onChangeText: React.PropTypes.func.isRequired,
  onSubmitEditing: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  value: React.PropTypes.string,
  returnKeyType: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  secureTextEntry: React.PropTypes.bool,
};

module.exports = StyledTextInput;
