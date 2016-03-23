import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listView: {
    backgroundColor: '#FFF',
    height: 620,
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
    width: 300,
    padding: 4,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
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
  categoryButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  checkboxEmpty: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#227DF4',
  },
  checkboxFilled: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#227DF4',
    backgroundColor: '#227DF4',
  },
});
