import React, { View, Text, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { reducer, store } from '../../../../sharedNative/reducers/reducers.js';
const actions = require('../../../../sharedNative/actions/actions.js');
import NavBar from '../../../Shared/NavBar.js';
import styles from '../../../../styles/styles.js';
import AddMembers from './AddMembers.js';
import CirclePic from '../../../Shared/CirclePic';
import { makeClickableRow, makeListContainer, UserList } from '../../../Shared/ComponentHelpers.js';
import { exitButton, enterButton } from '../../../Shared/Buttons.js';
import { navToFull, popScene } from '../../../Shared/NavHelpers.js';
const SelectPic = require('../../../Profile/SelectPic');
import { BackgroundImage } from '../../../Shared/BackgroundImage';
import { UserRow } from '../../../Shared/UserRow';
import SwipeOut from 'react-native-swipeout';

const currentGroup = (members) => {
  store.dispatch(actions.setUserGroupMembers(members));
};

const getGroups = (id) => {
  store.dispatch(actions.getUserGroups())
  .then((groups) => {
    currentGroup(groups[id]);
  });
};
const Group = (props) => {
  getGroups(props.route.focus.id);

  const GroupListContainer = makeListContainer(
    UserRow,
    ['userGroupMembers'],
    UserList
  );

  const changeGroupPic = imageObj => {
    // set loading here
    store.dispatch(actions.updateGroupPic(props.route.focus.id, imageObj.base64Image))
    .then(newPicLink => {
      props.route.focus.groupPictureUri = newPicLink;
      return 'tacos';
    })
    .then(() => {
      // unset loading here
      popScene();
    });
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedText}> { props.route.focus.name } </Text>
        </View>
        <View style={[styles.container]}>
        <View style={styles.center}>
          <TouchableOpacity onPress={() => navToFull({
            component: SelectPic,
            updateProfPic: changeGroupPic,
          })}
          >
            <CirclePic uri={props.route.focus.groupPictureUri} />
          </TouchableOpacity>
          </View>
          <GroupListContainer />
        </View>
        <NavBar
          leftButton={exitButton}
          rightButton={enterButton(AddMembers, props.route.focus)}
          style={styles.feedNavBar}
        />
      </View>
    </BackgroundImage>
  );
};

Group.propTypes = {
  route: React.PropTypes.object,
};

module.exports = Group;
