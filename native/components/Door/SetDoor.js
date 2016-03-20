import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import actions from '../../sharedNative/actions/actions';

import styles from '../../styles/Door/doorStyles.js';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';
import EventSettings from './EventSettings';
import OpenDoor from './OpenDoor';
import ClosedDoor from './ClosedDoor';

const SetDoor = class SetDoor extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDoor = this.toggleDoor.bind(this);
    this.postEvent = this.postEvent.bind(this);
  }
  toggleDoor() {
    this.props.onDoorToggle();
  }
  postEvent() {
    const eventToCreate = this.props.app.pendingEvent;
    eventToCreate.hostUserId = this.props.user.id;
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
          {
            this.props.app.pendingEvent ?
            <EventSettings event={this.props.app.pendingEvent}
              onChange={this.props.onEventSettingsChange}
              onSubmit={ this.postEvent }
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
