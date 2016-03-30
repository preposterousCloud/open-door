import React, {
  Text,
  View,
  Component,
  TouchableOpacity,
 } from 'react-native';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import { getAllUsers } from '../../sharedNative/actions/actions.js';
import NavigationBar from 'react-native-navbar';
import Swiper from 'react-native-swiper';
import FeedList from './FeedList.js';
import NavBar from '../Shared/NavBar.js';
import SetDoor from '../Door/SetDoor.js';
import Social from '../Social/Social.js';
import styles from '../../styles/Feed/feedStyles.js';

class Feed extends React.Component {
  // componentWillReceiveProps(nextProps) {
  //   const api = 5;
  //   const events = api.getEvents(nextProps.user.events.map(event => event.id));
  //   this.setState({ events });
  // }

  componentWillMount() {
    store.dispatch(getAllUsers());
  }

  render() {
    const rightNavButton = {
      title: 'My Door',
      handler: this.props.swipeRight,
    };

    const leftNavButton = {
      title: 'Social',
      handler: this.props.swipeLeft,
    };

    return (
      <View style={styles.container}>
        <NavBar
          title={this.props.userName}
          rightButton={rightNavButton}
          leftButton={leftNavButton}
        />
        <FeedList events={this.props.events} />
        <TouchableOpacity onPress={this.props.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Feed.propTypes = {
  swipeRight: React.PropTypes.func,
  swipeLeft: React.PropTypes.func,
  logout: React.PropTypes.func,
  userName: React.PropTypes.string,
  events: React.PropTypes.array,
  user: React.PropTypes.object,
};

module.exports = Feed;
