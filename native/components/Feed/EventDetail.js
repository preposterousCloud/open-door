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
      imageShowing: props.imageShowing,
      imageSource: require('../../sharedNative/images/dino-storm.jpg'),
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
          return (<CirclePic key={index} size={40} source={{ uri: group.groupPictureUri }} />);
        })}
       </View>
      ) :
      <Text> None </Text>;
  }
  getInvitedUserPics(event) {
    return event.Users.length ?
      (<View style={{ flexDirection: 'row', margin: 5 }}>
        {event.Users.map((user, index) => {
          return (<CirclePic key={index} size={40} source={{ uri: user.profilePictureUri }} style={{ margin: 4 }} />);
        })}
       </View>
      ) :
      <Text> None </Text>;
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
      <View style={[styles.imageContainer, { margin: this.defaultMargin }]}>
        {this.state.imageShowing ?
          <TouchableOpacity onPress={toggleImage} >
            <Image
              source={this.state.event && this.state.event.vibe ?
                vibes[this.state.event.vibe].src :
                this.state.imageSource}
              style={{ width: width - (2 * this.defaultMargin) }}
            />
          </TouchableOpacity> :
          <TouchableOpacity onPress={toggleImage} >
            <Text style = {styles.standardText }>Users Invited:</Text>
            {this.getInvitedUserPics(this.state.event)}
            <Text style = {styles.standardText }>Groups Invited:</Text>
            {this.getInvitedGroupPics(this.state.event)}
            <Text style = {styles.standardText }>Vibe: {this.state.event.vibe}</Text>
            <Text style = {styles.standardText }>Where: {this.state.event.location}</Text>
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
