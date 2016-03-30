import React, {
  Text,
  View,
  Component,
  Image,
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
import styles from '../../styles/styles.js';

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
    const rightNavButton = (
      <TouchableOpacity onPress={this.props.swipeRight}>
        <Image
          source={ require('../../static/opendoorlogogreen.png') }
          style={styles.navIcon}
        />
      </TouchableOpacity>
    );

    const leftNavButton = (
       <TouchableOpacity onPress={this.props.swipeLeft}>
        <Image
          source={ require('../../static/socialman.png') }
          style={styles.navIcon}
        />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedText}>WHO'S FREE</Text>
        </View>
        <FeedList events={this.props.events} />
        <TouchableOpacity onPress={this.props.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <NavigationBar
          title={{ title: '' }}
          rightButton={ rightNavButton }
          leftButton={ leftNavButton }
          tintColor={ 'transparent' }
          style={styles.feedNavBar}
        />
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
