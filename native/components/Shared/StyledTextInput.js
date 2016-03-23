import React, { View, Text, TextInput } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { setFilterText, clearFilterText } from '../../sharedNative/actions/actions.js';
import styles from '../../styles/Social/socialStyles.js';


// things it shoudl be passed:
  // onChangeText, placeholder
const StyledTextInput = (props) => (
  <View>
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={false}
      maxLength={25}
      placeholder={props.placeholder}
      style={styles.userInput}
      returnKeyType={'go'}
      onChangeText={props.onChangeText}
    />
  </View>
);


StyledTextInput.propTypes = {
  onChangeText: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
};

module.exports = StyledTextInput;
