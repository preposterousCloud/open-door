import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  bg: {
    backgroundColor: 'purple',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
  },
  userInput: {
    height: 50,
    padding: 5,
    margin: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#616161',
    borderRadius: 4,
    color: '#616161',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FBA',
  },
  rightContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: 'transparent',
  },
});
