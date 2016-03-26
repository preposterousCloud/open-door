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
import EditEvent from './EditEvent';
import EventDetail from '../Feed/EventDetail.js';
import OpenDoor from '../Shared/OpenDoor';
import ClosedDoor from '../Shared/ClosedDoor';
import styles from '../../styles/Door/doorStyles.js';

const LoadingWheel = require('../Shared/Misc').LoadingWheel;

const SetDoor = class SetDoor extends React.Component {

  goToSettings() { navTo(Profile); }

  render() {
    const createEvent = (event) => {
      this.props.onEventSubmit(event);
      this.setState({ doorOpen: true });
    };
    const updateEvent = (event) => {
      this.props.onEventUpdate(event);
    };
    const toggleDoor = () => {
      if (!this.props.user.currentEvent) {
        navToFull({
          component: EventSettings,
          onSubmit: createEvent,
        });
      } else {
        this.setState({ doorOpen: false });
        this.props.closeDoor();
      }
    };
    const navToEditEvent = () => {
      navToFull({
        component: EditEvent,
        event: this.props.user.currentEvent,
        onSubmit: updateEvent,
      });
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
            {(() => (this.props.currentEvent) ?
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
          {(() => (!this.props.currentEvent) ?
            <Text>You aren't hosting an event right now</Text> :
            (<View>
              <EventDetail imageShowing event={this.props.currentEvent} />
              <TouchableOpacity onPress={navToEditEvent} >
                <Text>Edit Event</Text>
              </TouchableOpacity>
            </View>)
          )()}
        </View>
      </View>
   );
  }
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  currentEvent: React.PropTypes.object,
  closeDoor: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  onEventSubmit: React.PropTypes.func.isRequired,
  onEventUpdate: React.PropTypes.func.isRequired,
};
module.exports = SetDoor;
