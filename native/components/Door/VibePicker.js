import React, { Text, TouchableOpacity, View, Picker } from 'react-native';

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
    this.state = {
      selectedVibe: props.initialVibe || 'jam',
    };
    this.changePickerValue = this.changePickerValue.bind(this);
  }
  changePickerValue(vibe) {
    this.setState({ selectedVibe: vibe });
    this.props.changeVibe(vibes[vibe]);
  }
  // Picker doesn't really care what type of element we provide as the item.
  // It manually iterates the children of Picker and creates its own children elements from them
  render() {
    return (
      <Picker
        selectedValue={this.state.selectedVibe}
        onValueChange={this.changePickerValue}
      >
        {
          Object.keys(vibes).map((vibe, index) => (
            <Picker.Item
              key={index}
              value={vibe}
              label={vibes[vibe].name}
            />
          ))
        }
      </Picker>
    );
  }
}

VibePicker.propTypes = {
  changeVibe: React.PropTypes.func,
  initialVibe: React.PropTypes.string,
};

module.exports = VibePicker;
