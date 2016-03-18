import React, {
  View,
  Text,
  TouchableOpacity,
  } from 'react-native';

import { reducer, store } from '../../sharedNative/reducers/reducers.js';

import styles from '../../styles/Door/doorStyles.js';
import NavBar from '../Shared/NavBar.js';
import Profile from '../Profile/Profile.js';
import EventSettingsContainer from './EventSettingsContainer';
import OpenDoor from './OpenDoor';
import ClosedDoor from './ClosedDoor';

const SetDoor = class SetDoor extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDoor = this.toggleDoor.bind(this);
  }
  toggleDoor() {
    // We blindly send the event object. in the scenario we are disabling the current event
    // it wont be used
    const dummyEvent = { name: 'Party', hostUserId: this.props.user.id };
    this.props.onDoorToggle(dummyEvent);
  }
  goToSettings() {
    store.getState().navigation.navigator.push({
      component: Profile,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={ 'My Door' }
          leftButton={ { title: '<', handler: this.props.swipeLeft } }
        />
        <TouchableOpacity onPress={this.toggleDoor}>
          {(() => this.props.user.currentEvent ?
            <OpenDoor styles={{ size: 100, color: 'green' }} /> :
            <ClosedDoor styles={{ size: 100, color: 'red' }} />
          )()}
        </TouchableOpacity>
        <EventSettingsContainer />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.pullRight} onPress={this.goToSettings}>
          <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
   );
  }
};

SetDoor.propTypes = {
  swipeLeft: React.PropTypes.func,
  user: React.PropTypes.object,
  onDoorToggle: React.PropTypes.func,
};
module.exports = SetDoor;
