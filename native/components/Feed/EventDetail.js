import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
const { width, height } = Dimensions.get('window');
import Accordion from 'react-native-accordion';
const api = require('../../sharedNative/utils/api.js');
import { store } from '../../sharedNative/reducers/reducers.js';
import vibes from '../Door/vibes.js';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShowing: props.imageShowing,
      imageSource: require('../../sharedNative/images/dino-storm.jpg'),
      contactMapper: store.getState().contactMap,
    };
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
      event.Users.map(user => this.state.contactMapper[user.id] || user.userName).join(', ') :
      'None';
  }
  render() {
    const toggleImage = () => {
      this.setState({
        imageShowing: !this.state.imageShowing,
      });
    };
    let eventPictureSource = this.state.imageSource;
    if (this.state.event) {
      if (this.state.event.eventPictureUri) {
        eventPictureSource = { uri: this.state.event.eventPictureUri };
      } else if (this.state.event.vibe) {
        eventPictureSource = vibes[this.state.event.vibe].src;
      }
    }
    return (
      <View style={styles.imageContainer}>
        {this.state.imageShowing ?
          <TouchableOpacity onPress={toggleImage} >
            <Image
              source={eventPictureSource}
              style={{ width, height: 300 }}
            />
          </TouchableOpacity> :
          <TouchableOpacity onPress={toggleImage} >
            <Text>Name: {this.state.event.name}</Text>
            <Text>Vibe: {this.state.event.vibe}</Text>
            <Text>Location: {this.state.event.location}</Text>
            <Text>Groups Invited: {this.getInvitedGroups(this.state.event)}</Text>
            <Text>Users Invited: {this.getInvitedUsers(this.state.event)}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

EventDetail.propTypes = {
  imageShowing: React.PropTypes.bool,
  event: React.PropTypes.object,
};


module.exports = EventDetail;
