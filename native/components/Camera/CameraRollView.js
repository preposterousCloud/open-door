/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule CameraRollView
 * @flow
 */
'use strict';

const React = require('react-native');
const {
  ActivityIndicatorIOS,
  CameraRoll,
  Dimensions,
  Image,
  ListView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} = React;
const groupByEveryN = require('groupByEveryN');
const logError = require('logError');

const CameraRollView = class CameraRollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.generateDefaultStateObj();
    this._renderFooterSpinner = this._renderFooterSpinner.bind(this);
    this._appendAssets = this._appendAssets.bind(this);
    this.fetch = this.fetch.bind(this);
    this._fetch = this._fetch.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this._renderRow = this._renderRow.bind(this);
  }
  generateDefaultStateObj() {
    const ds = new ListView.DataSource({ rowHasChanged: this._rowHasChanged });
    const { height, width } = Dimensions.get('window');
    return {
      assets: [],
      groupTypes: this.props.groupTypes,
      lastCursor: null,
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      dataSource: ds,
      screenHeight: height,
      screenWidth: width,
    };
  }
  /**
   * This should be called when the image renderer is changed to tell the
   * component to re-render its assets.
   */
  rendererChanged() {
    const ds = new ListView.DataSource({ rowHasChanged: this._rowHasChanged });
    this.setState({ dataSource: ds.cloneWithRows(
      groupByEveryN(this.state.assets, this.props.imagesPerRow)
    ) });
  }
  componentDidMount() {
    this.fetch();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.groupTypes !== nextProps.groupTypes) {
      this.fetch(true);
    }
  }
  _fetch(clear) {
    if (clear) {
      this.setState(this.generateDefaultStateObj(), this.fetch);
      return;
    }

    const fetchParams = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams)
    .then(this._appendAssets)
    .catch(logError);
  }
  /**
   * Fetches more images from the camera roll. If clear is set to true, it will
   * set the component to its initial state and re-fetch the images.
   */
  fetch(clear) {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this._fetch(clear);
      });
    }
  }
  render() {
    return (
      React.createElement(ListView, {
        renderRow: this._renderRow,
        renderFooter: this._renderFooterSpinner,
        onEndReached: this._onEndReached,
        style: styles.container,
        dataSource: this.state.dataSource }
      )
    );
  }
  _rowHasChanged(r1, r2) {
    if (r1.length !== r2.length) {
      return true;
    }

    for (let i = 0; i < r1.length; i++) {
      if (r1[i] !== r2[i]) {
        return true;
      }
    }

    return false;
  }
  _renderFooterSpinner() {
    if (!this.state.noMore) {
      return React.createElement(ActivityIndicatorIOS, { style: styles.spinner });
    }
    return null;
  }
  // rowData is an array of images
  _renderRow(rowData, sectionID, rowID) {
    const images = rowData.map((image, index) => {
      if (image === null) {
        return null;
      }
      return this.props.renderImage(image, this.state, this.props, index);
    });

    return (
      React.createElement(View, { style: styles.row },
        images
      )
    );
  }
  _appendAssets(data) {
    const assets = data.edges;
    const newState = { loadingMore: false };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.assets = this.state.assets.concat(assets);
      newState.dataSource = this.state.dataSource.cloneWithRows(
        groupByEveryN(newState.assets, this.props.imagesPerRow)
      );
    }

    this.setState(newState);
  }
  _onEndReached() {
    if (!this.state.noMore) {
      this.fetch();
    }
  }
};

CameraRollView.defaultProps = {
  groupTypes: 'SavedPhotos',
  batchSize: 5,
  imagesPerRow: 1,
  photoMargin: 4,
  assetType: 'Photos',
  onPress: () => console.log('Include onPress prop for photo event handling.'),
  renderImage: (asset, state, props, index) => {
    const imageSize = (state.screenWidth - ((props.photoMargin * props.imagesPerRow + 1) * 2 - 2)) / props.imagesPerRow;
    const imageStyle = { width: imageSize, height: imageSize, margin: props.photoMargin };
    return (
      <TouchableOpacity key={index} onPress={() => { props.onPress(asset);} }>
        <Image source={asset.node.image} style={imageStyle} />
      </TouchableOpacity>
    );
  },
};

CameraRollView.propTypes = {
  /**
   * The group where the photos will be fetched from. Possible
   * values are 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream'
   * and SavedPhotos.
   */
  groupTypes: React.PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos',
  ]),

  /**
   * Number of images that will be fetched in one page.
   */
  batchSize: React.PropTypes.number,

  /**
   * A function that takes a single image as a parameter and renders it.
   */
  renderImage: React.PropTypes.func,

  /**
   * imagesPerRow: Number of images to be shown in each row.
   */
  imagesPerRow: React.PropTypes.number,

   /**
   * The asset type, one of 'Photos', 'Videos' or 'All'
   */
  assetType: React.PropTypes.oneOf([
    'Photos',
    'Videos',
    'All',
  ]),

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
  info: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

module.exports = CameraRollView;
