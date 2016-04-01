import React, { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions');
import styles from '../../../../styles/styles.js';

class CreateGroupName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  render() {
    const borderBottomColor = this.state.focused ? '#FFF' : '#AAA';
    return (
      <View style={[styles.underlined, { borderBottomColor }]}>
        <TextInput
          autoCapitalize={'sentences'}
          autoCorrect={false}
          maxLength={32}
          placeholder={'Group Name'}
          value={this.props.groupName}
          style={styles.userInput}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          returnKeyType={'done'}
          onChangeText={ this.props.onUpdate }
          onSubmitEditing={ this.props.onSubmit }
        />
      </View>
    );
  }
}

CreateGroupName.propTypes = {
  groupName: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

module.exports = CreateGroupName;
