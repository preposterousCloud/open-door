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

const AssetScaledImageExampleView = require('./AssetScaledImageExample');

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
          imagesPerRow={1}
          renderImage={this._renderImage}
        />
      </View>
    );
  }
  loadAsset(asset){
    if (this.props.navigator) {
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: { asset: asset },
      });
    }
  }
  _renderImage(asset) {
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, { width: imageSize, height: imageSize }];
    const location = asset.node.location.longitude ?
      JSON.stringify(asset.node.location) : 'Unknown location';
    return (
      <TouchableOpacity key={asset} onPress={ this.loadAsset.bind( this, asset ) }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>
            <Text>{location}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
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
