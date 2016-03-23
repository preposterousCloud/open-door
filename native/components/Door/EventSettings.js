import React, { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from '../Shared/Button';
import { exitButton, makeListContainer, navTo, popScene } from '../Shared/Misc';
import { GroupList, UserList } from '../Shared/SelectList';
import NavBar from '../Shared/NavBar.js';
import styles2 from '../../styles/Door/doorStyles.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';

const InviteFriends = (props) => {
  return (
    <View>
      <NavBar
        title={'Invite Friends'}
        leftButton={{
          ...exitButton,
          title: 'Back',
        }}
      />
      <UserList />
    </View>
  );
};

const InviteGroups = (props) => {
  return (
    <View>
      <NavBar
        title={'Invite Groups'}
        leftButton={{
          ...exitButton,
          title: 'Back',
        }}
      />
      <GroupList />
    </View>
  );
};

const EventSettings = (props) => {
  const changeEventName = (text) => props.route.onChange('name', text);
  const changeEventDetails = (text) => props.route.onChange('details', text);
  const submitEvent = () => {
    props.route.onSubmit();
    popScene();
  }
  return (
    <View style={ styles.container }>
      <StyledTextInput
        onChangeText={changeEventName}
        placeholder={'Event Name'}
      />
      <StyledTextInput
        onChangeText={changeEventDetails}
        placeholder={'Description (optional)'}
      />
      <Button onClick = {submitEvent} text={'Save'} />
      <Button onClick = {popScene} text={'Cancel'} />
      <TouchableOpacity
        onPress={() => navTo(InviteFriends)}
        style={socialStyles.socialF}
      >
        <Text>FRIENDS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navTo(InviteGroups)}
        style={socialStyles.socialG}
      >
        <Text>GROUPS</Text>
      </TouchableOpacity>

    </View>
  );
}

EventSettings.propTypes = {
  route: React.PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'stretch',
    // flexDirection: 'column',
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
