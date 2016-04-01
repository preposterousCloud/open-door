import React, { View, TextInput } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { setFilterText, clearFilterText } from '../../sharedNative/actions/actions.js';
import styles from '../../styles/styles.js';

class FilterTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  componentDidMount() {
    store.dispatch(clearFilterText());
  }

  filterUsers(text) {
    store.dispatch(setFilterText(text));
  }

  render() {
    const borderBottomColor = this.state.focused ? '#FFF' : '#AAA';
    return (
      <View style={[styles.underlined, { borderBottomColor }]}>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={16}
          placeholder={'userName'}
          style={styles.userInput}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          returnKeyType={'go'}
          onChangeText={this.filterUsers}
        />
      </View>
    );
  }
}

module.exports = FilterTextInput;
