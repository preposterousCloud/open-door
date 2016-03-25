import React, { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/Feed/feedStyles.js';
const { width, height } = Dimensions.get('window');
import Accordion from 'react-native-accordion';
import api from '../../sharedNative/utils/api.js';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShowing: props.imageShowing,
      imageSource: require('./walkingDino.gif'),
    };
  }
  componentDidMount() {
    api.getEvent(this.props.event.id)
    .then((something) => {
      console.log('thing back from getEvent:', something);
    });
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
    const toggleImage = () => {
      this.setState({
        imageShowing: !this.state.imageShowing,
      });
    };
    return (
      <View style={styles.imageContainer}>
        {this.state.imageShowing ?
          <TouchableOpacity onPress={toggleImage} >
            <Image source={this.state.imageSource} style={{ width, height: 300 }} />
          </TouchableOpacity> :
          <TouchableOpacity onPress={toggleImage} >
            <Text>Name: {this.props.event.name}</Text>
            <Text>Host: {this.props.event.hostUser.userName}</Text>
            <Text>Address: {this.props.event.addressStreet1}</Text>
            <Text>City: {this.props.event.city}</Text>
            <Text>Groups Invited: {this.getInvitedGroups(this.props.event)}</Text>
            <Text>Users Invited: {this.getInvitedUsers(this.props.event)}</Text>
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
