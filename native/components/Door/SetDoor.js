import React, {
  View,
  Text,
  TouchableOpacity,
  Image,
  } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';
import { navTo, navToFull } from '../Shared/NavHelpers.js';
import NavBar from '../Shared/NavBar.js';
import ProfileContainer from '../Profile/ProfileContainer.js';
import EditEvent from './EditEvent';
import EventDetail from '../Feed/EventDetail.js';
import OpenDoor from '../Shared/OpenDoor';
import ClosedDoor from '../Shared/ClosedDoor';
import styles from '../../styles/styles.js';

const logoGreen = require('../../static/opendoorlogogreenlg.png');
const logoRed = require('../../static/opendoorlogoredlg.png');

const LoadingWheelContainer = require('../Shared/ComponentHelpers').LoadingWheelContainer;

const SetDoor = class SetDoor extends React.Component {
  render() {
    const goToSettings = () => {
      navToFull({
        component: ProfileContainer,
      });
    };
    const createEvent = (event) => {
      this.props.onEventSubmit(event);
    };
    const updateEvent = (event) => {
      this.props.onEventUpdate(event);
    };
    const toggleDoor = () => {
      if (!this.props.user.currentEvent) {
        navToFull({
          component: EditEvent,
          onSubmit: createEvent,
          event: {
            name: `${this.props.user.userName}'s party`,
            vibe: this.props.user.defaultVibe,
            location: this.props.user.defaultLocation,
            Users: [],
            Groups: [],
          },
        });
      } else {
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
    const doorIndicatorSource = this.props.currentEvent ? logoGreen : logoRed;
    return (
      <View>
        <NavBar
          title={ 'My Door' }
          leftButton={ { title: '<', handler: this.props.swipeLeft } }
          rightButton={ { title: 'Settings', handler: goToSettings }}
        />
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={toggleDoor}>
            <Image source={doorIndicatorSource} style={{ width: 200, height: 200 }} />
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
