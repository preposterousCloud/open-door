import React, { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from '../Shared/Button';
import { exitButton, makeListContainer, navToFull, popScene } from '../Shared/Misc';
import { GroupList, UserList } from '../Shared/SelectList';
import NavBar from '../Shared/NavBar.js';
import VibePicker from './VibePicker.js';
import styles2 from '../../styles/Door/doorStyles.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';

const InviteSelects = (props) => {
  const title = props.type === 'groups' ? 'Invite Groups' : 'Invite Friends';
  const List = props.type === 'groups' ? GroupList : UserList;
  return (
    <View>
      <NavBar title={title} leftButton={{ ...exitButton, title: 'Back' }} />
      <List />
    </View>
  );
};

class EventSettings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const changeEventName = (text) => this.props.route.onChange('name', text);
    const changeEventDetails = (text) => this.props.route.onChange('details', text);
    const submitEvent = () => {
      this.props.route.onSubmit();
      popScene();
    }
    return (
      <View style={ styles.container }>
        <StyledTextInput
          onChangeText={changeEventName}
          placeholder={'Event Name'}
        />
        <StyledTextInput
          onChangeText={changeEventDetails}
          placeholder={'Description (optional)'}
        />
        <Button onClick = {submitEvent} text={'Save'} />
        <Button onClick = {popScene} text={'Cancel'} />
        <VibePicker />
        <TouchableOpacity
          onPress={() => navToFull({ component: InviteSelects, type: 'friends' })}
          style={socialStyles.socialF}
        >
          <Text>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navToFull({ component: InviteSelects, type: 'groups' })}
          style={socialStyles.socialG}
        >
          <Text>GROUPS</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

EventSettings.propTypes = {
  route: React.PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'stretch',
    // flexDirection: 'column',
  },
  textBox: {
    width: 275,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FBA',
  },
  rightContainer: {
    flex: 1,
  },
  navBar: {
    // enter some styles here
  },
});

module.exports = EventSettings;
