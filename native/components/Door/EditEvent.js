import React, { Text, TouchableOpacity, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { backButton, cancelButtonNav, cancelButton } from '../Shared/Buttons.js';
import { navToFull, popScene } from '../Shared/NavHelpers.js';
import { getTruthies } from '../Shared/HelperFunctions.js';
import { GroupList, UserList } from '../Shared/StatefulSelectList';
import * as actions from '../../sharedNative/actions/actions';
import * as api from '../../sharedNative/utils/api.js';
import NavBar from '../Shared/NavBar.js';
import VibePicker from './VibePicker.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';
import SelectProfilePic from '../Profile/SelectProfilePic';
import styles from '../../styles/styles.js';

const InviteSelects = (props) => {
  return (
  <View>
    <NavBar title={props.route.title} leftButton={backButton} />
    <props.route.listComponent
      onItemClick={props.route.onItemClick}
      preSelected={props.route.preSelected}
    />
  </View>
);
}
InviteSelects.propTypes = { route: React.PropTypes.object };

const getInvited = (invitedArr) => {
  return invitedArr.reduce((allInvitedItems, singleInvitedItem) => {
    allInvitedItems[singleInvitedItem.id] = true;
    return allInvitedItems;
  }, {});
};

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSubmit: props.route.onSubmit,
      event: {
        invitedFriends: [],
        invitedGroups: [],
        preSelectedFriends: [],
        preSelectedGroups: [],
      },
    };
    this.navToGroups = this.navToGroups.bind(this);
    this.navToFriends = this.navToFriends.bind(this);
    this.toggleInviteGroup = this.toggleInviteGroup.bind(this);
    this.toggleInviteFriend = this.toggleInviteFriend.bind(this);
    this.navToEventPhoto = this.navToEventPhoto.bind(this);
  }
  componentDidMount() {
    if (this.props.route.event.id) {
      if (this.state) {
        api.getEvent(this.props.route.event.id, store.getState().jwt)
        .then((event) => {
          return this.setState({
            event: {
              ...event,
              invitedFriends: getInvited(event.Users),
              invitedGroups: getInvited(event.Groups),
              preSelectedFriends: getInvited(event.Users),
              preSelectedGroups: getInvited(event.Groups),
            }
          });
        })
        .then(() => this.forceUpdate());
      }
    } else {
      const event = { ...this.state.event, ...this.props.route.event };
      this.setState({ event });
    }
  }
  toggleInviteFriend(friend) {
    const event = this.state.event;
    event.invitedFriends[friend.id] = !event.invitedFriends[friend.id];
    this.setState({ event });
  }
  toggleInviteGroup(group) {
    const event = this.state.event;
    event.invitedGroups[group.id] = !event.invitedGroups[group.id];
    this.setState({ event });
  }
  navToGroups() {
    navToFull({
      component: InviteSelects,
      title: 'Invite Groups',
      listComponent: GroupList,
      onItemClick: this.toggleInviteGroup,
      preSelected: this.state.event.preSelectedGroups,
    });
  }
  navToFriends() {
    navToFull({
      component: InviteSelects,
      title: 'Invite Friends',
      listComponent: UserList,
      onItemClick: this.toggleInviteFriend,
      preSelected: this.state.event.preSelectedFriends,
    });
  }
  navToEventPhoto() {
    navToFull({
      component: SelectProfilePic,
      updateProfPic: (imageObj) => {
        // Trigger callback to update photo in state
        this.setState({ event: { ...this.state.event, imageObj } });
        popScene();
      }
    })
  }
  render() {
    const updateLocalEvent = (update) => {
      const event = this.state.event;
      event[Object.keys(update)[0]] = update[Object.keys(update)[0]];
      this.setState({ event });
    };
    const submitEvent = () => {
      if (!this.state.event.name) {
        Alert.alert('Your door needs a name!', '', [cancelButton]);
      } else {
        this.state.event.friends = getTruthies(this.state.event.invitedFriends);
        this.state.event.groups = getTruthies(this.state.event.invitedGroups);
        if (this.state.event.imageObj) {
          this.state.event.base64Image = this.state.event.imageObj.base64Image;
          delete this.state.event.imageObj;
        }
        this.state.onSubmit(this.state.event);
        popScene();
      }
    };
    const updateEventName = name => updateLocalEvent({ name });
    const updateEventLocation = location => updateLocalEvent({ location });
    const changeVibe = vibe => updateLocalEvent({ vibe });
    return this.state.event ? (
      <View>
        <NavBar title={'Edit Event'} leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: submitEvent }}
        />
        <StyledTextInput onChangeText={updateEventName} placeholder={this.state.event.name} />
        <StyledTextInput onChangeText={updateEventLocation} placeholder={this.state.event.location} />
        <VibePicker changeVibe={changeVibe} initialVibe={this.state.event.vibe} />
        <TouchableOpacity onPress={navToFriends} style={styles.categoryButton} >
          <Text>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navToGroups} style={styles.categoryButton} >
          <Text>GROUPS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navToEventPhoto} style={socialStyles.categoryButton} >
          <Text>SET PHOTO</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }
}

EditEvent.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditEvent;
