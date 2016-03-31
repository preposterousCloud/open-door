import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
import Accordion from 'react-native-accordion';
import * as api from '../../sharedNative/utils/api.js';
import { store } from '../../sharedNative/reducers/reducers.js';
import vibes from '../Door/vibes.js';
import CirclePic from '../Shared/CirclePic';

const { width, height } = Dimensions.get('window');

class EventDetail extends React.Component {
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
  getInvitedGroupPics(event) {
    return event.Groups.length ?
      (<View style={{ flexDirection: 'row', margin: 5 }}>
        {event.Groups.map((group, index) => {
          return (
            <CirclePic
              key={index}
              size={40}
              source={{ uri: group.groupPictureUri }}
              style={{ margin: 4 }}
            />
          );
        })}
       </View>
      ) :
      <Text></Text>;
  }
  getInvitedUserPics(event) {
    return event.Users.length ?
      (<View style={{ flexDirection: 'row', margin: 5 }}>
        {event.Users.map((user, index) => {
          return (
            <CirclePic
              key={index}
              size={40}
              source={{ uri: user.profilePictureUri }}
              style={{ margin: 4 }}
            />
          );
        })}
       </View>
      ) :
      <Text></Text>;
  }
  generateEventDetails() {
    return (
      <View style={[this.swiperItemStyles]}>
        {this.getInvitedUserPics(this.state.event)}{this.getInvitedGroupPics(this.state.event)}
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

EventDetail.propTypes = {
  event: React.PropTypes.object,
};


module.exports = EventDetail;
