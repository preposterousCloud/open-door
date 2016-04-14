import React, { Text, TouchableOpacity, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { BackgroundImage } from '../Shared/BackgroundImage.js';
import { backButton, cancelButtonNav, cancelButton } from '../Shared/Buttons.js';
import { navTo, navToFull, popScene } from '../Shared/NavHelpers.js';
import { getTruthies } from '../Shared/HelperFunctions.js';
import { GroupList, UserList } from '../Shared/StatefulSelectList';
import * as actions from '../../sharedNative/actions/actions';
import * as api from '../../sharedNative/utils/api.js';
import NavBar from '../Shared/NavBar.js';
import VibePicker from './VibePicker.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';
import SelectPic from '../Profile/SelectPic';
import styles from '../../styles/styles.js';
import Checklist from '../Shared/Checklist';

const getIds = arrOfObjsWithIds => arrOfObjsWithIds.map(obj => obj.id);

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSubmit: props.route.onSubmit,
      invitedGroups: [],
      invitedFriends: [],
    };
    this.navToGroups = this.navToGroups.bind(this);
    this.navToFriends = this.navToFriends.bind(this);
    this.navToEventPhoto = this.navToEventPhoto.bind(this);
  }
  componentDidMount() {
    if (this.props.route.event.id) {
      if (this.state) {
        api.getEvent(this.props.route.event.id, store.getState().jwt)
        .then((event) => {
          const invitedFriends = getIds(event.Users);
          const invitedGroups = getIds(event.Groups);
          return this.setState({ event, invitedGroups, invitedFriends });
        });
      }
    } else {
      const event = { ...this.state.event, ...this.props.route.event };
      this.setState({ event });
    }
  }
  navToGroups() {
    navTo(() => (
      <BackgroundImage>
        <View style={{ marginHorizontal: 20 }}>
          <Checklist
            preSelected={group => this.state.invitedGroups.indexOf(group.id) > -1}
            onSubmit={(invitedGroupsFull) => {
              this.setState({ invitedGroups: getIds(invitedGroupsFull) });
              popScene();
            }}
            data={store.getState().user.Groups}
            displayTextRoute={['name']}
            title={'Invite Groups'}
          />
        </View>
      </BackgroundImage>)
    );
  }
  navToFriends() {
    navTo(() => (
      <BackgroundImage>
      <View style={{ marginHorizontal: 20 }}>
        <Checklist
          preSelected={friend => this.state.invitedFriends.indexOf(friend.id) > -1}
          onSubmit={invitedFriendsFull => {
            this.setState({ invitedFriends: getIds(invitedFriendsFull) });
            popScene();
          }}
          data={store.getState().user.friends}
          displayTextRoute={['userName']}
          title={'Invite Friends'}
        />
      </View>
    </BackgroundImage>)
    );
  }
  navToEventPhoto() {
    navToFull({
      component: SelectPic,
      updateProfPic: (imageObj) => {
        // Trigger callback to update photo in state
        this.setState({ event: { ...this.state.event, imageObj } });
        popScene();
      }
    })
  }
  render() {
    const updateLocalEvent = (update) => {
      const event = this.state.event;
      event[Object.keys(update)[0]] = update[Object.keys(update)[0]];
      this.setState({ event });
    };
    const submitEvent = () => {
      if (!this.state.event.name) {
        Alert.alert('Your door needs a name!', '', [cancelButton]);
      } else {
        this.state.event.friends = this.state.invitedFriends;
        this.state.event.groups = this.state.invitedGroups;
        this.state.event.startDateUtc = Date.now();
        this.state.event.endDateUtc = Date.now() + (4 * 3.6e+6); // 4 hours in ms
        if (this.state.event.imageObj) {
          this.state.event.base64Image = this.state.event.imageObj.base64Image;
          delete this.state.event.imageObj;
        }
        this.state.onSubmit(this.state.event);
        popScene();
      }
    };
    const updateEventName = name => updateLocalEvent({ name });
    const updateEventLocation = location => updateLocalEvent({ location });
    const changeVibe = vibe => updateLocalEvent({ vibe });
    const defaultEventPictureSource = require('../../static/bgLibrary/everycolor.png');
    let backgroundImageSource = defaultEventPictureSource;
    if (this.state.event) {
      if (this.state.event.imageObj) {
        backgroundImageSource = { uri: this.state.event.imageObj.imageObj.node.image.uri};
      } else if (this.state.event.eventPictureUri) {
        backgroundImageSource = { uri: this.state.event.eventPictureUri };
      }
    }
    return this.state.event ? (
      <BackgroundImage source={backgroundImageSource} event blur={'light'}>
        <View style={[styles.container, { backgroundColor: '#0008', height: 800 }]}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedText}> EDIT EVENT</Text>
          </View>
          <View style={styles.centerContainerNoMargin}>
            <StyledTextInput onChangeText={updateEventName} placeholder={this.state.event.name} />
            <StyledTextInput onChangeText={updateEventLocation} placeholder={this.state.event.location} />
            <View style={[styles.vibePicker]}>
              <VibePicker changeVibe={changeVibe} initialVibe={this.state.event.vibe} />
            </View>
            <View style={[styles.profileLineContainer, styles.stackVertical, styles.center, {marginTop: -20}]}>
              <TouchableOpacity onPress={this.navToFriends} >
                <Text style={[styles.white, styles.large]}>friends</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.profileLineContainer, styles.stackVertical, styles.center]}>
              <TouchableOpacity onPress={this.navToGroups} >
                <Text style={[styles.white, styles.large]}>groups</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.profileLineContainer, styles.stackVertical, styles.center]}>
              <TouchableOpacity onPress={this.navToEventPhoto} >
                <Text style={[styles.white, styles.large]}>photo</Text>
              </TouchableOpacity>
            </View>

          </View>
          <NavBar
            leftButton={cancelButtonNav}
            rightButton={{ title: 'Save', handler: submitEvent }}
          />
        </View>
      </BackgroundImage>
    ) : null;
  }
}

EditEvent.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditEvent;
