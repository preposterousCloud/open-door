import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  navbar: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#3333',
  },
  navbarButton: {
    paddingTop: 30,
    paddingBottom: 10,
    width: 50,
    color: '#0076FF',
    textAlign: 'center',
  },
  navbarTitle: {
    paddingTop: 30,
    paddingBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  checkboxFilled: {
    backgroundColor: '#007AFF',
  },
  feedListEntryView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  listView: {
    backgroundColor: 'transparent',
    height: 620,
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#DDD3',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
});
