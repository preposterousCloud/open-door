import React, { View, TextInput, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const EventSettings = (props) => (
  <View style={ styles.container }>
    <TextInput
      style={ styles.textBox }
      onChangeText={(text) => props.onChange('name', text)}
      value={props.event.name}
    />
    <TextInput
      style={ styles.textBox }
      onChangeText={(text) => props.onChange('desc', text)}
      value={props.event.desc}
    />
  </View>
);

EventSettings.propTypes = {
  event: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  textBox: { 
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FBA',
  },
  rightContainer: {
    flex: 1,
  },
  navBar: {
    // enter some styles here
  },
});

module.exports = EventSettings;
