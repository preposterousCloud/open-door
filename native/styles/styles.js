import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const radius = 50;
const navBarHeight = 200;
module.exports = StyleSheet.create({
  // General BG Style
  bg: {
    backgroundColor: '#0BE3',
  },
  bgImg: {
    flex: 1,
    resizeMode: 'stretch',
  },
  // Containers
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  eventDetailComponent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
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
    marginTop: 0,
  },
  centerContainerNoMargin: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  setDoorContainer: {
    borderColor: '#FFF3',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    backgroundColor: '#0002',
  },
  // Nav
  tabBar: {
    borderTopWidth: 3,
    borderBottomWidth: 1,
    borderColor: '#007AFF',
  },
  navBar: {
    backgroundColor: 'transparent',
    margin: 20,
  },
  navBarTop: {
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  feedNavBar: {
    height: height / 10,
  },
  // Lists
  listView: {
    backgroundColor: 'transparent',
    height: 620,
  },
  // Feed Specific
  feedListRow: {
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DDD3',
  },
  feedListEntryView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  feedListEntryTextView: {
    flex: 2,
    alignItems: 'center',
    marginRight: 50,
  },
  feedHeader: {
    justifyContent: 'flex-end',
  },
  feedText: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
    top: 30,
    fontSize: 24,
    fontFamily: 'DroidSans',
    color: '#FFF4',
  },
  eventDetailContainer: {
    borderBottomWidth: 1,
    borderColor: '#FFF4',
    paddingTop: 10,
    paddingBottom: 10,
  },
  eventDetailBoxes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vibeTextHeader: {
    fontFamily: 'DroidSans-Bold',
    flex: 1,
    flexDirection: 'row',
    color: '#FFF',
    textAlign: 'center',
  },
  locTextHeader: {
    fontFamily: 'DroidSans-Bold',
    flex: 1,
    flexDirection: 'row',
    color: '#FFF',
    textAlign: 'center',
  },
  vibeText: {
    flex: 1,
    flexDirection: 'row',
    color: '#FFF',
    textAlign: 'center',
  },
  locText: {
    flex: 1,
    flexDirection: 'row',
    color: '#FFF',
    textAlign: 'center',
  },
  feedDetailInvitees: {
    paddingTop: 20,
    paddingBottom: 200,
    alignItems: 'center',
  },
  listEntryView: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#DDD3',
    backgroundColor: 'transparent',
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
  standardText: {
    color: '#FFF',
    fontFamily: 'DroidSans',
  },
  mediumText: {
    color: '#FFF',
    fontFamily: 'DroidSans',
    fontSize: 15,
  },
  rowHeader: {
    color: '#FFF',
    fontFamily: 'DroidSans',
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 5,
  },
  // Forms
  userInput: {
    flex: 1,
    height: 50,
    width: width * 0.8,
    padding: 4,
    fontSize: 18,
    color: 'white',
  },
  underlined: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  checkboxFilled: {
    backgroundColor: '#FFF',
  },
  // Buttons
  socialF: {
    justifyContent: 'center',
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD3',
    alignItems: 'center',
  },
  socialG: {
    justifyContent: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD3',
    alignItems: 'center',
  },
  socialText: {
    fontFamily: 'DroidSans',
    color: '#FFFB',
    fontSize: 25,
  },
  categoryButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  feedNav: {
    height: 40,
    width: 40,
    alignItems: 'stretch',
  },
  navIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  navButtonMargin: {
    marginHorizontal: 20,
  },
  // Door-Specific
  noHost: {
    textAlign: 'center',
    color: '#FFF3',
    bottom: 175,
    fontSize: 17,
  },
  // Profile and Group Pic
  profilePic: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    flex: 1,
  },
  feedEventHostPic: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  inviteeBubbles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 15,
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
  hrule: {
    fontSize: 45,
    bottom: 5,
    color: '#FFF4',
  },
  elipsis: {
    fontSize: 20,
    bottom: 20,
    color: '#FFF4',
    alignSelf: 'flex-end',
  },
  // text
  bold: {
    fontWeight: '800',
    fontSize: 20,
  },
  large: {
    fontSize: 20,
  },
  white: {
    color: 'white',
  },
  stackVertical: {
    flexDirection: 'column',
  },
  shadow: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0.1,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLineContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#DDD3',
    justifyContent: 'space-between',
  },
  topBuffer: {
    paddingTop: 20,
  },
  loginTextLogo: {
    margin: 10,
    marginTop: 20,
    height: 70,
    width: 250,
  },
  vibePicker: {
    width,
  },
  width80pct: {
    width: width * 0.8,
  },
  fullScreen: {
    width,
    height,
  },
  fullScreenUnderNavbar: {
    width,
    height: height - navBarHeight,
  },
});
