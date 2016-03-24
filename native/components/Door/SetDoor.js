import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';
import { navTo, navToFull } from '../Shared/Misc';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';
import EventSettings from './EventSettings';
import EventDetails from './EventDetails';
import OpenDoor from '../Shared/OpenDoor';
import ClosedDoor from '../Shared/ClosedDoor';
import styles from '../../styles/Door/doorStyles.js';

const LoadingWheel = require('../Shared/Misc').LoadingWheel;

const SetDoor = class SetDoor extends React.Component {
  goToSettings() { navTo(Profile); }

  render() {
    const createEvent = (event) => this.props.onEventSubmit(event);
    const toggleDoor = () => {
      this.props.onDoorToggle();
      if (this.props.app.pendingEvent) {
        navToFull({
          component: EventSettings,
          event: this.props.app.pendingEvent,
          onChange: this.props.onEventSettingsChange,
          onSubmit: createEvent,
        });
      }
    };
    return (
      <View>
        <NavBar
          title={ 'My Door' }
          leftButton={ { title: '<', handler: this.props.swipeLeft } }
          rightButton={ { title: 'Settings', handler: this.goToSettings }}
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={toggleDoor}>
            {(() => (this.props.user.currentEvent || this.props.app.pendingEvent) ?
              <OpenDoor styles={{ size: 100, color: 'green' }} /> :
              <ClosedDoor styles={{ size: 100, color: 'red' }} />
            )()}
          </TouchableOpacity>
        </View>
        <View>
          {(() => (!this.props.user.Events) ?
            <Text>You aren't invited to any events</Text> :
            <Text>You're invited to {this.props.user.Events.length} events</Text>
          )()}
          {(() => (!this.props.user.currentEvent) ?
            <Text>You aren't hosting an event right now</Text> :
            <EventDetails event={this.props.user.currentEvent} />
          )()}
        </View>
      </View>
   );
  }
};
// <Text>You're hosting {this.props.user.currentEvent.name} right now</Text>
SetDoor.propTypes = {
  swipeLeft: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  onDoorToggle: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  onEventSettingsChange: React.PropTypes.func.isRequired,
  onEventSubmit: React.PropTypes.func.isRequired,
};
module.exports = SetDoor;
