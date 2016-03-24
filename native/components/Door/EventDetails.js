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
        <Text>Location: {this.props.event.addressStreet1}</Text>
        <Text>Description: {this.props.event.description}</Text>
      </View>
    );
  }
}
exports = EventDetails;
EventDetails.propTypes = {
  event: React.PropTypes.object,
};
