import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
import Accordion from 'react-native-accordion';
import * as api from '../../sharedNative/utils/api.js';
import { store } from '../../sharedNative/reducers/reducers.js';
import vibes from '../Door/vibes.js';
import CirclePic from '../Shared/CirclePic';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShowing: props.imageShowing,
      imageSource: require('../../sharedNative/images/dino-storm.jpg'),
      event: { Users: [], Groups: [] },
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
          return (<CirclePic key={index} size={40} source={{ uri: group.groupPictureUri }} style={{ margin: 4 }} />);
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
  generateEventDetails() {
    return (
      <View style={[{ margin: this.defaultMargin, flexDirection: 'column', flex: 1, height: 200 }]}>
        <Text style = {styles.standardText }>Users Invited:</Text>
        {this.getInvitedUserPics(this.state.event)}
        <Text style = {styles.standardText }>Groups Invited:</Text>
        {this.getInvitedGroupPics(this.state.event)}
        <Text style = {styles.standardText }>Vibe: {this.state.event.vibe}</Text>
        <Text style = {styles.standardText }>Where: {this.state.event.location}</Text>
      </View>
    );
  }
  generatePhotoSlides() {
    return (
      <View style={[{ margin: this.defaultMargin, flexDirection: 'column', flex: 1, height: 200 }]}>
        <Image
          source={ this.state.imageSource }
          style={{ width: width - (2 * this.defaultMargin) }}
        />
      </View>
    );
  }
  render() {
    return (
      <Swiper style={styles.wrapper} height={200}>
        <View>
          { this.generateEventDetails() }
        </View>
        { this.generatePhotoSlides() }
      </Swiper>
    );
  }
}

EventDetail.propTypes = {
  imageShowing: React.PropTypes.bool,
  event: React.PropTypes.object,
};


module.exports = EventDetail;
