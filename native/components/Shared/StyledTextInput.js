import React, { View, Text, TextInput } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { setFilterText, clearFilterText } from '../../sharedNative/actions/actions.js';
import styles from '../../styles/styles.js';


// things it shoudl be passed:
  // onChangeText, placeholder
  // defaultValue={props.}
class StyledTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  render() {
    const borderBottomColor = this.state.focused ? '#FFF' : '#AAA';
    return (
      <View style={[styles.underlined, { borderBottomColor }]}>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={this.props.maxLength || 25}
          placeholder={this.props.placeholder || ''}
          value={this.props.value || undefined}
          style={styles.userInput}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          returnKeyType={this.props.returnKeyType || 'next'}
          onChangeText={this.props.onChangeText || (() => null)}
          keyboardType={this.props.keyboardType || 'default'}
          onSubmitEditing={this.props.onSubmitEditing}
          secureTextEntry={this.props.secureTextEntry || false}
        />
      </View>
    );
  }
}

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
