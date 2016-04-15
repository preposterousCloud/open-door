import React, { Image, Dimensions } from 'react-native';
const { BlurView, VibrancyView } = require('react-native-blur');
const { width, height } = Dimensions.get('window');

import styles from '../../styles/styles.js';

export const BackgroundImage = ({ source, children, style, ...props, blur, vibrancy, event }) => {
  source = source || require('../../static/bg.jpg')
  if (event) {
    return (
      <BlurView blurType={blur || 'dark'} style={[styles.fullscreen, { backgroundColor: 'transparent' }]}>
      <Image
      source={source}
      style={{ width, height }}
      >
        {children}
        </Image>
      </BlurView>
  );
  }
  if (blur) {
    return (<Image
      source={source}
      style={[style]}
      {...props}>
      <BlurView blurType={blur || 'dark'} style={{flex: 1, width: null, height: null, backgroundColor: 'transparent',}}>
        {children}
      </BlurView>
    </Image>);
  }
  if (vibrancy) {
    return (
      <Image
        source={source}
        style={[{flex: 1, width: null, height: null}, style]}
        {...props}>
        <VibrancyView style={{ height: 800 }} blurType={vibrancy || 'dark'} >
        {children}
        </VibrancyView>
      </Image>
    );
  }
  return (
    <Image
      source={source}
      style={[{flex: 1, width: null, height: null}, style]}
      {...props}>
      {children}
    </Image>
  );
};
