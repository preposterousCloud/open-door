import React, { Text, TouchableOpacity, View, PickerIOS, PickerItemIOS } from 'react-native';

const vibes = {
  ball: {
    name: 'Fancy Ball',
  },
  birthday: {
    name: 'Birthday Party',
  },
  kick: {
    name: 'Kick Back',
  },
  jam: {
    name: 'Jam Session',
  },
  rager: {
    name: 'Rager',
  },
  dino: {
    name: 'Dinotopia',
  },
};

class VibePicker extends React.Component {
  constructor(props) {
    super(props);
    let key = 1;
    this.state = {
      vibe: props.initialVibe || 'jam',
      changeVibe: props.changeVibe,
      vibePickerItems: Object.keys(vibes).map((vibe) => (
        <PickerItemIOS
          key={key++}
          value={vibe}
          label={vibes[vibe].name}
        />
      )),
    };
  }

  render() {
    const changeValue = (vibe) => {
      this.setState({ vibe });
      this.state.changeVibe(vibes[vibe]);
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
