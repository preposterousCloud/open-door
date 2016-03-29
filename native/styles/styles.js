import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const radius = 50;
module.exports = StyleSheet.create({
  bg: {
    backgroundColor: 'purple',
  },
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
  greyedOutListEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
  },
  greyedOutListEntryViewText: {
    color: '#777',
    justifyContent: 'space-between',
  },
  highlightedListEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#BCDAE4',
  },
  highlightedListEntryViewText: {
    color: '#023242',
    justifyContent: 'space-between',
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
  tabBar: {
    borderTopWidth: 3,
    borderBottomWidth: 1,
    borderColor: '#007AFF',
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
    borderColor: '#007AFF',
  },
  checkboxFilled: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
  },
  rightContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: 'transparent',
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
  pullLeft: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pullRight: {
    paddingRight: 10,
  },
  profilePic: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  },
});
