import React, { Text, TouchableOpacity, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { exitButton, cancelButton, makeListContainer, navToFull, popScene } from '../Shared/Misc';
import { GroupList, UserList } from '../Shared/StatefulSelectList';
const actions = require('../../sharedNative/actions/actions');
import NavBar from '../Shared/NavBar.js';
import VibePicker from './VibePicker.js';
import styles2 from '../../styles/Door/doorStyles.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';

const InviteSelects = (props) => {
  const title = props.route.type === 'groups' ? 'Invite Groups' : 'Invite Friends';
  const List = props.route.type === 'groups' ? GroupList : UserList;
  return (
    <View>
      <NavBar title={title} leftButton={{ handler: exitButton.handler, title: 'Back' }} />
      <List inviteFunc={props.route.inviteFunc} />
    </View>
  );
};
InviteSelects.propTypes = {
  route: React.PropTypes.object,
};

const getTruthies = (obj) => Object.keys(obj).filter(key => obj[key]).map(i => +i);

class EventSettings extends React.Component {
  constructor(props) {
    super(props);
    console.log('onSubmit:', props.route.onSubmit, 'type:', typeof props.route.onSubmit);
    this.state = {
      onSubmit: props.route.onSubmit,
      event: {
        hostUserId: store.getState().user.id,
        invitedFriends: {},
        invitedGroups: {},
      },
    };
  }
  render() {
    const updateEvent = (update) => {
      const updatedEvent = this.state.event;
      updatedEvent[Object.keys(update)[0]] = update[Object.keys(update)[0]];
      this.setState({ event: updatedEvent });
    };
    const submitEvent = () => {
      console.log('Submitted vibe:', this.state.event.vibe);
      console.log('Submitted event name:', this.state.event.name);
      console.log('Submitted event details:', this.state.event.details);
      console.log('Invited Friends:', this.state.event.invitedFriends);
      console.log('Invited Groups:', this.state.event.invitedGroups);
      if (!this.state.event.name) {
        Alert.alert('Your door needs a name!', '', [cancelButton]);
      } else {
        console.log('creating event:', this.state.event);
        this.state.event.friends = getTruthies(this.state.event.invitedFriends);
        this.state.event.groups = getTruthies(this.state.event.invitedGroups);
        this.state.onSubmit(this.state.event);
        popScene();
      }
    };
    const updateEventName = name => updateEvent({ name });
    const updateEventDetails = details => updateEvent({ details });
    const changeVibe = (vibe) => updateEvent({ vibe });
    const toggleInviteFriend = (friendId) => {
      const event = this.state.event;
      event.invitedFriends[friendId] = !event.invitedFriends[friendId];
      this.setState({ event });
    };
    const navToFriends = () => navToFull({
      component: InviteSelects,
      type: 'friends',
      inviteFunc: toggleInviteFriend,
    });
    const toggleInviteGroup = (groupId) => {
      const event = this.state.event;
      event.invitedGroups[groupId] = !event.invitedGroups[groupId];
      this.setState({ event });
    };
    const navToGroups = () => navToFull({
      component: InviteSelects,
      type: 'groups',
      inviteFunc: toggleInviteGroup,
    });
    return (
      <View style={ socialStyles.container }>
        <StyledTextInput
          onChangeText={updateEventName}
          placeholder={'Event Name'}
        />
        <StyledTextInput
          onChangeText={updateEventDetails}
          placeholder={'Description (optional)'}
        />
        <Button onClick = {submitEvent} text={'Save'} />
        <Button onClick = {popScene} text={'Cancel'} />
        <VibePicker
          changeVibe={changeVibe}
          initialVibe={'jam'}
        />
        <TouchableOpacity
          onPress={navToFriends}
          style={socialStyles.categoryButton}
        >
          <Text>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navToGroups}
          style={socialStyles.categoryButton}
        >
          <Text>GROUPS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EventSettings.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EventSettings;
