import React, { ListView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import styles from './ChecklistStyles.js';

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
      <TouchableOpacity onPress={clickThisRow} >
        <View style={styles.listEntryView}>
          <Text style={styles.rowText}>{row.displayText}</Text>
          <View style={[styles.checkbox, row.checked && styles.checkboxFilled]} />
        </View>
      </TouchableOpacity>
    );
  }
  submit() {
    const checkedItems = this.state.data.filter(row => row.checked).map(row => row.datum);
    this.props.onSubmit(checkedItems);
  }
  render() {
    return (
      <View style={{ width: React.Dimensions.width }}>
        <View style={styles.navbar} >
          <TouchableOpacity onPress={this.submit} >
            <Text style={styles.navbarButton}>{this.props.cancelText || 'Cancel'}</Text>
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>{this.props.title || 'Checklist'}</Text>
          <TouchableOpacity onPress={this.submit} >
            <Text style={styles.navbarButton}>{this.props.submitText || 'Submit'}</Text>
          </TouchableOpacity>
        </View>

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
  title: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  submitText: React.PropTypes.string,
};


module.exports = Checklist;
