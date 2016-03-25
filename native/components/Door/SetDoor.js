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
import EventDetail from '../Feed/EventDetail.js';
import OpenDoor from '../Shared/OpenDoor';
import ClosedDoor from '../Shared/ClosedDoor';
import styles from '../../styles/Door/doorStyles.js';

const LoadingWheel = require('../Shared/Misc').LoadingWheel;

const SetDoor = class SetDoor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorOpen: !!props.user.currentEvent,
    };
  }
  goToSettings() { navTo(Profile); }

  render() {
    const createEvent = (event) => {
      this.props.onEventSubmit(event);
      this.setState({ doorOpen: true });
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
    return (
      <View>
        <NavBar
          title={ 'My Door' }
          leftButton={ { title: '<', handler: this.props.swipeLeft } }
          rightButton={ { title: 'Settings', handler: this.goToSettings }}
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={toggleDoor}>
            {(() => (this.props.user.currentEvent) ?
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
            <EventDetail imageShowing event={this.props.user.currentEvent} />
          )()}
        </View>
      </View>
   );
  }
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  closeDoor: React.PropTypes.func.isRequired,
  app: React.PropTypes.object.isRequired,
  onEventSubmit: React.PropTypes.func.isRequired,
};
module.exports = SetDoor;
