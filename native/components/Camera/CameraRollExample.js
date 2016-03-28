'use strict';

const React = require('react-native');
const {
  CameraRoll,
  Image,
  SliderIOS,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
} = React;

const CameraRollView = require('./CameraRollView');
const CAMERA_ROLL_VIEW = 'camera_roll_view';

const CameraRollExample = class CameraRollExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groupTypes: 'All' };
    this._renderImage = this._renderImage.bind(this);
  }
  render() {
    return (
      <View>
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={20}
          groupTypes ={'All'}
          imagesPerRow={3}
        />
      </View>
    );
  }
  _renderImage(asset) {
    const imageSize = 75;
    const imageStyle = [styles.image, { width: imageSize, height: imageSize }];
    const location = asset.node.location.longitude ?
      JSON.stringify(asset.node.location) : 'Unknown location';
    return (
      <TouchableOpacity onPress ={() => { console.log(asset);} }>
        <Image
          source={asset.node.image}
          style={imageStyle}
        />
      </TouchableOpacity>
    );
  }
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

module.exports = CameraRollExample;
