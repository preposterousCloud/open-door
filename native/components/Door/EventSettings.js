import React, { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from '../Shared/Button';
import { makeListContainer } from '../Shared/Misc';
import { UserList } from '../Shared/SelectList';

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
    <Button onClick = {props.onSubmit} text={'Invite Friends'} />
    <UserList />
    <Button onClick = {props.onSubmit} text={'Confirm'} />
  </View>
);

EventSettings.propTypes = {
  event: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

// const FriendsToAdd = (props) => {
//   return (
    
//   )
// } 

const AddFriends = (props) => {
  // return makeListContainer(, [all], listComponent)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
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
