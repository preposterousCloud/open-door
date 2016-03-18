import React, { View, TextInput, Text } from 'react-native';

//  <Text>yoooo</Text>
const EventSettings = (props) => (
  <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={(text) => props.onChange('name', text)}
    value={props.event.name}
  /> 
)

module.exports = EventSettings;
