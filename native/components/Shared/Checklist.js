import React, { ListView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/styles.js';
// inputs
  // data - array containing the data being shown in the checklist
    // ['frog', 'dog', 'pufferfish', ...]
    // [{id:1, name: 'Bob'}, {id:5, name: 'Bob'}, {id:1, name: 'Bob'}]
  // displayRoute - array of strings with the property route to the display property
    // ['userDetails', 'name', firstName]
    // for { userDetails: { name: { firstName: 'Bob', lastName: 'Mud', age: 30}}}
  // style
  // onSubmit
    // function that gets passed the checked items, the entire data array, and the unchecked items
  // preSelected
    // function that returns true for items that should be pre-selected
    // typically will be handed by holding all the checked items in a closure

const propRoute = (obj, propArr) => (
  propArr.reduce((nestedObj, prop) => nestedObj[prop], obj)
);

const arrayToDataSource = (array = []) => {
  return (new ListView.DataSource(
      { rowHasChanged: (row1, row2) => row1 !== row2 }
    ).cloneWithRows(array)
  );
};

const Checkbox = (props) => {
  if (props.checked) {
    return <View style={styles.checkboxFilled} />;
  }
  return <View style={styles.checkboxEmpty} />;
};

Checkbox.propTypes = { checked: React.PropTypes.bool };

class Checklist extends React.Component {
  constructor(props) {
    super(props);
    const preSelected = props.preSelected || (() => false);
    const data = props.data.map((datum, index) => ({
      displayText: propRoute(datum, props.displayTextRoute),
      checked: props.preSelected(datum),
      datum,
      index,
    }));
    this.state = { data };
    this.ItemView = this.ItemView.bind(this);
    this.submit = this.submit.bind(this);
  }

  ItemView(row) {
    const clickThisRow = () => {
      row.checked = !row.checked;
      this.forceUpdate();
    };
    return (
      <TouchableOpacity
        onPress={clickThisRow}
        style={styles.group}
      >
        <View style={styles.listEntryView}>
          <Text>{row.displayText}</Text>
          <Checkbox checked={row.checked} />
        </View>
      </TouchableOpacity>
    );
  }
  submit() {
    const checked = this.state.data.filter((row) => row.checked);
    this.props.onSubmit(checked);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.submit}
          style={{ margin: 100 }}
        >
          <Text style={{ fontSize: 20 }}>Done!</Text>
        </TouchableOpacity>
        <ListView
          dataSource={ arrayToDataSource(this.state.data) }
          renderRow={this.ItemView}
          style={styles.listView}
        />
      </View>
    );
  }
}

Checklist.propTypes = {
  preSelected: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  data: React.PropTypes.array,
  displayTextRoute: React.PropTypes.array,
};

module.exports = Checklist;
