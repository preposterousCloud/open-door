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
import { navToFull } from './Shared/NavHelpers';
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
      phone: '',
      userName: '',
      password: '',
    });
    store.dispatch(actions.checkForJwtAndLogin());
  }
  AlertInvalidCredentials() {
    Alert.alert('Invalid Credentials', '', [
      {
        text: 'Ok',
        onPress: () => console.log('OK Pressed'),
        style: 'default',
      },
    ]);
  }
  AlertServerError() {
    Alert.alert('Unknown Server Error', 'Try again later.', [
      {
        text: 'Ok',
        onPress: () => console.log('OK Pressed'),
        style: 'default',
      },
    ]);
  }
  navigateToLoggedInApp() {
    navToFull({ name: 'Main' });
  }
  sanitizePhoneInput() {
    const sanitized = this.state.phone.replace(/\D/igm, '');
    console.log(sanitized)
    return sanitized;
  }
  loginToApp() {
    this.setState({ phone: this.sanitizePhoneInput() });
	store.dispatch(attemptLogin(this.state.userName, this.state.password))
    .then(res => {
      console.log('res', res);
      if (res.err) {
        switch (res.err.status) {
          case 401: {
            this.AlertInvalidCredentials();
            break;
          }
          default:
            this.AlertServerError();
            break;
        }
      } else {
        // Set JWT to state
        this.navigateToLoggedInApp();
      }
    });
  }
  signupUser() {
    this.setState(this.sanitizePhoneInput());
    store.dispatch(createUser(this.state.phone, this.state.userName, this.state.password))
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
          placeholder={'Phone Number'}
          value={this.state.phone}
          style={styles.userInput}
          returnKeyType={'go'}
          onChangeText={(text) => this.updateFormProp('phone', text)}
        />
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
