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


const Login = class Login extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormProp = this.updateFormProp.bind(this);
    this.loginToApp = this.loginToApp.bind(this);
    this.signupUser = this.signupUser.bind(this);
  }
  componentWillMount() {
    this.setState({
      userName: '',
      password: '',
    });
    store.dispatch(actions.checkForJwtAndLogin());
  }
  alertUserNotFound() {
    Alert.alert(`${this.state.userName}`, 'not found', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Create',
        onPress: () => store.dispatch(createUser(this.state.userName, this.password))
        .then(user => user && this.navigateToLoggedInApp()),
        style: 'default',
      },
    ]);
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
        this.alertUserNotFound();
      }
    })
    .catch((err) => {
      console.warn(err);
      this.alertUserNotFound();
    });
  }
  signupUser() {
    store.dispatch(createUser(this.state.userName, this.state.password))
    .then(this.navigateToLoggedInApp)
    .catch((err) => {
      console.warn(err);
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
        <Button text={'Signup'} onClick={this.signupUser} />
      </View>
    );
  }
};

module.exports = Login;
