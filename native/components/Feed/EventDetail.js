import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles.js';
import Accordion from 'react-native-accordion';
import * as api from '../../sharedNative/utils/api.js';
import { store } from '../../sharedNative/reducers/reducers.js';
import { BackgroundImage } from '../Shared/BackgroundImage'
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
      event: { Users: [], Groups: [], uploadedPictures: [] },
    };
    this.contactMapper = store.getState().contactMap;
    this.defaultMargin = 10;
    this.swiperItemStyles = {
      marginHorizontal: 0,
      marginTop: 0,
      flexDirection: 'column',
      flex: 1,
      height: 275,
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
      '';
  }
  getInvitedUsers(event) {
    return event.Users.length ?
      event.Users.map(user => this.contactMapper[user.id] || user.userName).join(', ') :
      '';
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
      null;
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
      null;
  }
  generateEventDetails() {
    return (
      <View style={[this.swiperItemStyles]}>
        <BackgroundImage
          source={{ uri: this.props.event.eventPictureUri }}
          children={null}
          style={styles.eventDetailBg}
          blur={'dark'}
        >
        <View style={styles.eventDetailContainer}>
          <View style={styles.eventDetailBoxes}>
            <Text style = {styles.vibeTextHeader }>Vibe</Text>
            <Text style = {styles.locTextHeader }>Where</Text>
          </View>
          <View style={styles.eventDetailBoxes}>
            <Text style = {styles.vibeText }>{this.state.event.vibe}</Text>
            <Text style = {styles.locText }>{this.state.event.location}</Text>
          </View>
        </View>
        <View style={styles.feedDetailInvitees}>
          <Text style = {styles.standardText }>
            {this.props.event.Users.length ? 'Users Invited' : ''}
          </Text>
            {this.getInvitedUserPics(this.state.event)}
          <Text style = {styles.standardText }>
            {this.props.event.Groups.length ? 'Groups Invited' : ''}
          </Text>
            {this.getInvitedGroupPics(this.state.event)}
        </View>
        </BackgroundImage>
      </View>
    );
  }
  generatePhotoSlides() {
    if (!this.state.event.eventPictureUri &&
      ((this.state.event.uploadedPictures && this.state.event.uploadedPictures.length === 0) ||
      (!!this.state.event.uploadedPictures === false))) {
      return null;
    }
    let eventPictureSource;
    if (this.state.event) {
      if (this.state.event.eventPictureUri) {
        eventPictureSource = { uri: this.state.event.eventPictureUri };
      } else if (this.state.event.vibe) {
        eventPictureSource = vibes[this.state.event.vibe].src;
      }
    }
    return (
      <View style={[this.swiperItemStyles]}>
        <Image
          source={ eventPictureSource }
          style={{ width, height: 275 }}
        />
      </View>
    );
  }
  render() {
    const photoViews = this.generatePhotoSlides();
    let swipesToRender;
    if (!photoViews) {
      swipesToRender = this.generateEventDetails();
    } else {
      swipesToRender = [this.generateEventDetails(), photoViews];
    }
    console.log(this.props)
    return (
      <Swiper style={styles.wrapper} height={275} loop={false}>
        {swipesToRender}
      </Swiper>
    );
  }
}

EventDetail.propTypes = {
  imageShowing: React.PropTypes.bool,
  event: React.PropTypes.object,
};


module.exports = EventDetail;
