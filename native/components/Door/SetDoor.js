import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';
import { navToFull } from '../Shared/Misc';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';
import EventSettings from './EventSettings';
import OpenDoor from '../Shared/OpenDoor';
import ClosedDoor from '../Shared/ClosedDoor';
import styles from '../../styles/Door/doorStyles.js';

const LoadingWheel = require('../Shared/Misc').LoadingWheel;

const SetDoor = class SetDoor extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDoor = this.toggleDoor.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }
  createEvent() {
    // Consider moving all of this logic into the action and read everything directly from state
    const eventToCreate = this.props.app.pendingEvent;
    eventToCreate.hostUserId = this.props.user.id;
    eventToCreate.friends = Object.keys(this.props.app.pendingSelections.friendsToInvite);
    eventToCreate.groups = Object.keys(this.props.app.pendingSelections.groupsToInvite);
    this.props.onEventSubmit(eventToCreate);
  }
  toggleDoor() {
    this.props.onDoorToggle();
    if (this.props.app.pendingEvent) {
      navToFull({
        component: EventSettings,
        event: this.props.app.pendingEvent,
        onChange: this.props.onEventSettingsChange,
        onSubmit: this.createEvent,
      });
    }
  }
  goToSettings() {
    store.getState().navigation.navigator.push({
      component: Profile,
    });
  }

  render() {
    return (
      <View>
        <NavBar
          title={ 'My Door' }
          leftButton={ { title: '<', handler: this.props.swipeLeft } }
          rightButton={ { title: 'Settings', handler: this.goToSettings }}
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.toggleDoor}>
            {(() => (this.props.user.currentEvent || this.props.app.pendingEvent) ?
              <OpenDoor styles={{ size: 100, color: 'green' }} /> :
              <ClosedDoor styles={{ size: 100, color: 'red' }} />
            )()}
          </TouchableOpacity>
        </View>
        <View>
          <Text>Event Details Here</Text>
          <Text>Make this the event details from feed</Text>
        </View>
      </View>
   );
  }
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  onDoorToggle: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  onEventSettingsChange: React.PropTypes.func.isRequired,
  onEventSubmit: React.PropTypes.func.isRequired,
};
module.exports = SetDoor;
