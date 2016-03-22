import React, { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

export const Button = (props) => {
  const providedStyles = props.styles || {};
  return (
    <TouchableOpacity style={providedStyles.button || defaultStyles.button} 
      onPress={ props.onClick }
    >
      <Text style={providedStyles.buttonText || defaultStyles.buttonText}>
        { props.text }
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  styles: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
};

const defaultStyles = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF5A5F',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});
