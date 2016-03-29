import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

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
  pullLeft: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pullRight: {
    paddingRight: 10,
  },
  profilePic: {
    width,
    height: 300,
  },
});
