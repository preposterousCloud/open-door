import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const radius = 50;
module.exports = StyleSheet.create({
  // General BG Style
  bg: {
    backgroundColor: 'purple',
  },
  // Containers
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // Nav
  tabBar: {
    borderTopWidth: 3,
    borderBottomWidth: 1,
    borderColor: '#007AFF',
  },
  navBar: {
    backgroundColor: 'transparent',
  },
  // Lists
  listView: {
    backgroundColor: '#FFF',
    height: 620,
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'space-between',
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
  highlightedListEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#BCDAE4',
  },
  greyedOutListEntryViewText: {
    color: '#777',
    justifyContent: 'space-between',
  },
  highlightedListEntryViewText: {
    color: '#023242',
    justifyContent: 'space-between',
  },
  // Forms
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
  // Buttons
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
  // Profile and Group Pic
  profilePic: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  },
  // Footer
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  // General
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
});
