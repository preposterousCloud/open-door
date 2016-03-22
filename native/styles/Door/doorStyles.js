import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  listView: {
    backgroundColor: '#FFF',
    height: 600,
    flex: 1,
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  listEntryViewDef: {
    flexDirection: 'row',
    backgroundColor: '#BCDAE4',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  pullRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingRight: 20,
  },
});
