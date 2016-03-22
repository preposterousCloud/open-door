import React, { View, TextInput } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { setFilterText, clearFilterText } from '../../sharedNative/actions/actions.js';
import styles from '../../styles/Social/socialStyles.js';

class FilterTextInput extends React.Component {
  componentDidMount() {
    store.dispatch(clearFilterText());
  }

  filterUsers(text) {
    store.dispatch(setFilterText(text));
  }

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={16}
          placeholder={'userName'}
          style={styles.userInput}
          returnKeyType={'go'}
          onChangeText={this.filterUsers}
        />
      </View>
    );
  }
}

module.exports = FilterTextInput;
