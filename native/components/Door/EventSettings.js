import React, { View, TextInput, Text } from 'react-native';

const EventSettings = (props) => (
  <View>
    <TextInput
      style={ { height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => props.onChange('name', text)}
      value={props.event.name}
    />
    <TextInput
      style={ { height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => props.onChange('name', text)}
      value={props.event.name}
    />
  </View>
);

EventSettings.propTypes = {
  event: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

module.exports = EventSettings;
