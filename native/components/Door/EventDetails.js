import React, {
  View,
  Text,
  } from 'react-native';

class EventDetails extends React.Component{
  render() {
    return (
      <View>
        <Text>Your door is open!</Text>
        <Text>Name: {this.props.event.name}</Text>
        <Text>Location: {this.props.event.addressStreet1 || 'N/A'}</Text>
        <Text>Description: {this.props.event.description || 'N/A'}</Text>
      </View>
    );
  }
}

EventDetails.propTypes = {
  event: React.PropTypes.object,
};

module.exports = EventDetails;
