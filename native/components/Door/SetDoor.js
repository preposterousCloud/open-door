import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';
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
  toggleDoor() {
    this.props.onDoorToggle();
  }
  createEvent() {
    // Consider moving all of this logic into the action and read everything directly from state
    const eventToCreate = this.props.app.pendingEvent;
    eventToCreate.hostUserId = this.props.user.id;
    eventToCreate.friends = Object.keys(this.props.app.pendingSelections.friendsToInvite);
    eventToCreate.groups = Object.keys(this.props.app.pendingSelections.groupsToInvite);
    this.props.onEventSubmit(eventToCreate);
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
          <LoadingWheel isLoading={ this.props.app.isLoading } />
          {
            this.props.app.pendingEvent ?
            <EventSettings event={this.props.app.pendingEvent}
              onChange={this.props.onEventSettingsChange}
              onSubmit={ this.createEvent }
            /> :
            <Text />
          }
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
