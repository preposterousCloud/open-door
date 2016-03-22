import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions.js');
import NavBar from '../../../Shared/NavBar.js';
import styles from '../../../../styles/Social/socialStyles.js';
import feedStyles from '../../../../styles/Feed/feedStyles.js';
import AddMembers from './AddMembers.js';
import {
  exitButton,
  enterButton,
  makeClickableRow,
  makeListContainer,
  UserList,
} from '../../../Shared/Misc.js';

const currentGroup = (members) => {
  store.dispatch(actions.setUserGroupMembers(members));
};

const getGroups = (id) => {
  store.dispatch(actions.getUserGroups())
  .then((groups) => {
    console.log('Current Groups:', groups)
    currentGroup(groups[id]);
  });
};

const Group = (props) => {
  getGroups(props.route.focus.id);
  const listGroupMembers = (member) => {
    console.log(`You clicked on ${member.groupId}, id:${member.id}`);
  };

  const GroupListContainer = makeListContainer(makeClickableRow(listGroupMembers), ['userGroupMembers'], UserList);
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
