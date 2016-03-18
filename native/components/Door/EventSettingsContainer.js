import React from 'react-native';
import EventSettings from './EventSettings';

const EventSettingsContainer = class EventSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }
  
  componentWillMount() {
    this.setState({
      event: {
        name: null,
        startDateUtc: null,
        endDateUtc: null,
        friends: [],
        groups: [],
      },
    });
  }

  updateState(prop, value) {
    const update = { prop: value };
    console.log('update state', update);
    this.setState({ event: update });
  }
  render(d) {
    return <EventSettings event={this.state.event} onChange={this.updateState} />;
  }
};

module.exports = EventSettingsContainer;
