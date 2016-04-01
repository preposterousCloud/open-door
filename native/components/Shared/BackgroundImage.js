import React, { Image } from 'react-native';
const { BlurView, VibrancyView } = require('react-native-blur');

export const BackgroundImage = ({ source, children, style, ...props, blur }) => {
  source = source || require('../../static/bg.jpg')
  console.log(blur)
  return blur ? (
    <Image
      source={source}
      style={[style]}
      {...props}>
      <BlurView blurType={blur || 'dark'} style={{flex: 1, width: null, height: null, backgroundColor: 'transparent',}}>
        {children}
      </BlurView>
    </Image>
    ) : (
    <Image
      source={source}
      style={[{flex: 1, width: null, height: null}, style]}
      {...props}>
      {children}
    </Image>
  );
};
