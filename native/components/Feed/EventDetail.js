import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';
const { width, height } = Dimensions.get('window');

import Accordion from 'react-native-accordion';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShowing: props.imageShowing,
      imageSource: require('./walkingDino.gif'),
      event: props.event,
    };
  }
  getInvitedGroups(event) {
    return event.Groups ?
      event.Groups.map(group => group.name).join(', ') :
      'None';
  }
  getInvitedUsers(event) {
    return event.Users ?
      event.Users.map(user => user.userName).join(', ') :
      'None';
  }
  render() {
    const hideImage = () => {
      console.log('burhvent:', this.state.event);
      this.setState({
        imageShowing: false,
      });
    };
    return (
      <View style={styles.imageContainer}>
        {this.state.imageShowing ?
          <TouchableOpacity onPress={hideImage} >
            <Image source={this.state.imageSource} style={{ width, height: 300 }} />
          </TouchableOpacity> :
          <View>
            <Text>Name: {this.state.event.name}</Text>
            <Text>Address: {this.state.event.addressStreet1}</Text>
            <Text>City: {this.state.event.city}</Text>
            <Text>Groups Invited: {this.getInvitedGroups(this.state.event)}</Text>
            <Text>Users Invited: {this.getInvitedUsers(this.state.event)}</Text>
          </View>
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
