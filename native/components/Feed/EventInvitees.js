import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
import Accordion from 'react-native-accordion';
import * as api from '../../sharedNative/utils/api.js';
import { store } from '../../sharedNative/reducers/reducers.js';
import vibes from '../Door/vibes.js';
import CirclePic from '../Shared/CirclePic';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

class EventInvitees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: { Users: [], Groups: []},
    };
    this.contactMapper = store.getState().contactMap;
    this.defaultMargin = 10;
  }
  componentDidMount() {
    api.getEvent(this.props.event.id, store.getState().jwt)
    .then((event) => {
      this.setState({ event });
    });
  }
  componentWillReceiveProps(nextProps) {
    api.getEvent(this.props.event.id, store.getState().jwt)
    .then((event) => {
      if (this.state) {
        this.setState({ event });
      }
    });
  }
  getInvitedGroups(event) {
    return event.Groups.length ?
      event.Groups.map(group => group.name).join(', ') :
      'None';
  }
  getInvitedUsers(event) {
    return event.Users.length ?
      event.Users.map(user => this.contactMapper[user.id] || user.userName).join(', ') :
      'None';
  }
  getInvitedGroupPics(event, limit) {
    return event.Groups.length ?
      (<View style={{ flexDirection: 'row', margin: 5 }}>
        {event.Groups.map((group, index) => {
          return (index <= limit ?
            <CirclePic
              key={index}
              size={30}
              source={{ uri: group.groupPictureUri }}
              style={{ margin: 4 }}
            /> :
            <View></View>
          );
        })}
       </View>
      ) :
      <Text></Text>;
  }
  getInvitedUserPics(event, limit) {
    return event.Users.length ?
      (<View style={{ flexDirection: 'row', margin: 5 }}>
        {event.Users.map((user, index) => {
          return (index <= limit ?
            <CirclePic
              key={index}
              size={30}
              source={{ uri: user.profilePictureUri }}
              style={{ margin: 4 }}
            /> :
            <View></View>
          );
        })}
       </View>
      ) :
      <Text></Text>;
  }
  renderDivider(event) {
    return event.Groups.length && event.Users.length ?
    (
      <Text style={styles.hrule}>|</Text>
    ) :
    <Text></Text>
  }
  generateEventDetails() {
    const groupDispLimit = this.state.event.Users.length > 2 ? 1 : 2;
    const userDispLimit = this.state.event.Groups.length > 2 ? 1 : 2;
    return (
      <View style={styles.inviteeBubbles}>
        {this.props.event.Groups.length ? this.getInvitedGroupPics(this.state.event, groupDispLimit) : <View></View>}
        {this.renderDivider(this.state.event)}
        {this.props.event.Users.length ? this.getInvitedUserPics(this.state.event, userDispLimit) : <View></View>}
        {this.props.event.Groups.length + this.props.event.Users.length > 4 ? <Text style={styles.elipsis}>...</Text> : <Text></Text>}
      </View>
    );
  }
  render() {
    return (
      <View>
        {this.generateEventDetails()}
      </View>
    );
  }
}

EventInvitees.propTypes = {
  event: React.PropTypes.object,
};


module.exports = EventInvitees;
