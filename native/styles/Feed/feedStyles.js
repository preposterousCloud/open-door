import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listView: {
    backgroundColor: '#FFF',
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  accordion: {
    height: 500,
    backgroundColor: '#888',
  },
});
