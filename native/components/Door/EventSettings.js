import React, { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from '../Shared/Button';
import { exitButton, makeListContainer, navTo, popScene } from '../Shared/Misc';
import { GroupList, UserList } from '../Shared/SelectList';
import NavBar from '../Shared/NavBar.js';

const InviteFriends = (props) => {
  return (
    <View>
      <NavBar
        title={'Invite Friends'}
      />
      <UserList />
      <Button text ={'Go Back'} onClick = {popScene} />
    </View>
  );
};

const InviteGroups = (props) => {
  return (
    <View>
      <NavBar
        title={'Invite Groups'}
      />
      <GroupList />
      <Button text ={'Go Back'} onClick = {popScene} />
    </View>
  );
};

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
    <Button onClick = {() => navTo(InviteFriends) } text={'Invite Friends'} />
    <Button onClick = {() => navTo(InviteGroups) } text={'Invite Groups'} />
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
