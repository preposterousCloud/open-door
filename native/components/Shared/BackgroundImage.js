<<<<<<< HEAD
import React, { Image } from 'react-native';

export const BackgroundImage = ({ source, children, style, ...props }) => {
  source = source || require('../../static/bg.jpg')
=======
import React, {
  Image,
} from 'react-native';

module.exports = BackgroundImage = ({ source, children, style, ...props }) => {
>>>>>>> 47450ae4fd80e82f5236c942fb00616b73af5f43
  return (
      <Image
        source={source}
        style={{flex: 1, width: null, height: null, ...style}}
        {...props}>
        {children}
      </Image>
  );
};
