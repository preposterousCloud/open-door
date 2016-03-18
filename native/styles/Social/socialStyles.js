import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DF2309',
  },
  listView: {
    backgroundColor: '#FFF',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInput: {
    height: 50,
    padding: 4,
    margin: 40,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#616161',
    borderRadius: 4,
    color: '#616161',
  },
  socialF: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  socialG: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 50,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  checkboxEmpty: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#227DF4',
  }
});
