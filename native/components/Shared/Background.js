import React, { Image } from 'react-native';

export const BackgroundImage = ({ source, children, style, ...props }) => {
  return (
      <Image
        source={source}
        style={{flex: 1, width: null, height: null, ...style}}
        {...props}>
        {children}
      </Image>
  );
}