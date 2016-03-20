import React, { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const EventSettings = (props) => (
  <View style={ styles.container }>
    <TextInput
      style={ styles.textBox }
      onChangeText={(text) => props.onChange('name', text)}
      value={props.event.name}
      placeholder={'Event Name (optional)'}
    />
    <TextInput
      style={ styles.textBox }
      onChangeText={(text) => props.onChange('desc', text)}
      value={props.event.desc}
      placeholder={'Description (optional)'}
    />
    <TouchableOpacity onPress={ props.onSubmit }>
      <Text> Confirm </Text>
    </TouchableOpacity>
  </View>
);

EventSettings.propTypes = {
  event: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  textBox: { 
    width: 275,
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
