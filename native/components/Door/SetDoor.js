import React, {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';
import { navTo, navToFull } from '../Shared/NavHelpers.js';
import ProfileContainer from '../Profile/ProfileContainer.js';
import EditEvent from './EditEvent';
import EventDetail from '../Feed/EventDetail.js';
import { Person, LeftArrow } from '../Shared/Icons';
import styles from '../../styles/styles.js';
import NavigationBar from 'react-native-navbar';

const logoGreen = require('../../static/opendoorlogogreenlg.png');
const logoRed = require('../../static/opendoorlogoredlg.png');
const { width, height } = Dimensions.get('window');

const LoadingWheelContainer = require('../Shared/ComponentHelpers').LoadingWheelContainer;

const goToSettings = () => {
  navToFull({
    component: ProfileContainer,
  });
};

const SetDoor = class SetDoor extends React.Component {
  render() {
    const SettingsButton = (
      <TouchableOpacity onPress={goToSettings} style={styles.navButtonMargin}>
        <Person style={{ size: 50, color: 'white' }} />
      </TouchableOpacity>
    );
    const FeedButton = (
      <TouchableOpacity onPress={this.props.swipeLeft} style={styles.navButtonMargin}>
        <LeftArrow style={{ size: 50, color: '#FFF' }} />
      </TouchableOpacity>
    );
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
    const doorSize = () => {
      let heightConstant;
      if (height >= 667) {
        heightConstant = 4
      } else if (height < 667) {
        heightConstant = 8
      }
      return {width: height/heightConstant, height: height/heightConstant}
    }
    const doorIndicatorSource = this.props.currentEvent ? logoGreen : logoRed;
    return (
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedText}>YOUR DOOR</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.centerContainer}>
            <TouchableOpacity onPress={toggleDoor}>
              <Image source={doorIndicatorSource} style={doorSize()} />
            </TouchableOpacity>
          </View>
          <View>
            { /* (() => (!this.props.user.Events) ?
              <Text>You aren't invited to any events</Text> :
              <Text>You're invited to {this.props.user.Events.length} events</Text>
            )()
            */ }
            {(() => (!this.props.currentEvent) ?
              <Text style={styles.noHost}>You aren't hosting an event right now.</Text> :
              (<View>
                <TouchableOpacity onPress={navToEditEvent} style={styles.setDoorContainer}>
                  <Text style={styles.standardText}>Edit Event</Text>
                </TouchableOpacity>
                <EventDetail imageShowing event={this.props.currentEvent} />
              </View>)
            )()}
          </View>
        </View>
        <NavigationBar
          leftButton={FeedButton}
          rightButton={SettingsButton}
          tintColor={ 'transparent' }
          style={styles.feedNavBar}
        />
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
