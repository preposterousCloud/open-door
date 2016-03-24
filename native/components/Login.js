import React, {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
const localStore = require('react-native-simple-store');

import { store } from '../sharedNative/reducers/reducers';
import { attemptLogin, createUser } from '../sharedNative/actions/actions';
import { navToFull } from './Shared/Misc';
import MainContainer from './MainContainer';
import OpenDoor from './Shared/OpenDoor';
import Button from './Shared/Button';
import styles from '../styles/Shared/sharedStyles';
const actions = require('../sharedNative/actions/actions');

const cancelButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const alertUserNotFound = (userName) => {
  Alert.alert(`${userName}`, 'not found', [
    cancelButton,
    { text: 'Create',
      onPress: () => store.dispatch(createUser(userName))
      .then(user => user && navigateToLoggedInApp()),
      style: 'default',
    },
  ]);
};

const Login = class Login extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormProp = this.updateFormProp.bind(this);
    this.loginToApp = this.loginToApp.bind(this);
  }
  componentWillMount() {
    this.setState({
      userName: '',
      password: '',
    });

    localStore.get('jwt')
    .then((result) => {
      console.log('jwt', result);
      if (result) {
        console.log(result);
        store.dispatch(actions.setJwt(result));
        this.navigateToLoggedInApp();
      }
    });
  }
  navigateToLoggedInApp() {
    navToFull({ name: 'Main' });
  }
  loginToApp() {
    store.dispatch(attemptLogin(this.state.userName, this.state.password))
    .then(userFound => {
      if (userFound) {
        // Set JWT to state
        this.navigateToLoggedInApp();
      } else {
        alertUserNotFound(this.state.userName);
      }
    });
  }
  updateFormProp(field, val) {
    const obj = {};
    obj[field] = val;
    this.setState(obj);
  }
  render() {
    return (
      <View style={styles.container}>
        <OpenDoor styles = {{ size: 200, color: 'green' }} />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={16}
          placeholder={'User Name'}
          value={this.state.userName}
          style={styles.userInput}
          returnKeyType={'go'}
          onChangeText={(text) => this.updateFormProp('userName', text)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={16}
          placeholder={'Password'}
          value={this.state.password}
          style={styles.userInput}
          returnKeyType={'go'}
          onChangeText={(text) => this.updateFormProp('password', text)}
          onSubmitEditing={this.loginToApp}
          secureTextEntry
        />
        <Button text={'Login'} onClick={this.loginToApp} />
        <Button text={'Signup'} onClick={() => {}} />
      </View>
    );
  }
};

module.exports = Login;
