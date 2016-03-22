import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
import NavBar from '../../../Shared/NavBar.js';
import styles from '../../../../styles/Social/socialStyles.js';
import feedStyles from '../../../../styles/Feed/feedStyles.js';
import AddMembers from './AddMembers.js';
import {
  exitButton,
  enterButton,
  makeClickableRow,
  makeListContainer,
} from '../../../Shared/Misc.js';

const Group = (props) => {
  const logUser = (user) => {
    console.log(`You clicked on ${user.userName}, id:${user.id}`);
  };

  const GroupListContainer = makeListContainer(makeClickableRow(logUser), ['user', 'friends']);
  const logProps = () => console.log(props);
  return (
    <View>
      <NavBar
        title={ props.route.focus.name }
        leftButton={exitButton}
        rightButton={enterButton(AddMembers, props.route.focus)}
      />
      <GroupListContainer />
    </View>
  );
};

Group.propTypes = {
  route: React.PropTypes.object,
};

module.exports = Group;
