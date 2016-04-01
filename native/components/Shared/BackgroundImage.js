import React, { Image } from 'react-native';
const { BlurView, VibrancyView } = require('react-native-blur');

import styles from '../../styles/styles.js';

export const BackgroundImage = ({ source, children, style, ...props, blur, vibrancy }) => {
  source = source || require('../../static/bg.jpg')
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
    return (<Image
      source={source}
      style={[style]}
      {...props}>
      <VibrancyView blurType={vibrancy || 'dark'} style={styles.fullscreen}>
        {children}
      </VibrancyView>
    </Image>)
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
