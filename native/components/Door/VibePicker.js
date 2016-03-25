import React, { Text, TouchableOpacity, View, PickerIOS, PickerItemIOS } from 'react-native';

import vibes from './vibes.js';

class VibePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vibe: props.initialVibe || 'jam',
      changeVibe: props.changeVibe,
      vibePickerItems: Object.keys(vibes).map((vibe, index) => (
        <PickerItemIOS
          key={index}
          value={vibe}
          label={vibes[vibe].name}
        />
      )),
    };
  }

  render() {
    const changeValue = (vibe) => {
      this.setState({ vibe });
      this.state.changeVibe(vibe);
    };
    return (
      <PickerIOS
        selectedValue={this.state.vibe}
        onValueChange={changeValue}
      >
        {this.state.vibePickerItems}
      </PickerIOS>
    );
  }
}

VibePicker.propTypes = {
  changeVibe: React.PropTypes.func,
  initialVibe: React.PropTypes.string,
};

module.exports = VibePicker;
