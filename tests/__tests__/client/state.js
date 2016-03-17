
// Disable jest automock as these tests are part unit/part integration testing and we want sequelize

jest.autoMockOff();

const a = require('./../../../native/sharedNative/ActionTypes');
const actions = require('./../../../native/sharedNative/actions/actions');
const { reducer, store } = require('./../../../native/sharedNative/reducers/reducers');

describe('Data Integration Tests', () => {
  it('Toggle isLoading', () => {
    expect(store.getState().app.isLoading).toBe(false);
    store.dispatch({ type: a.TOGGLE_LOADING, data: false });
    expect(store.getState().app.isLoading).toBe(false);
    store.dispatch({ type: a.TOGGLE_LOADING, data: true });
    expect(store.getState().app.isLoading).toBe(true);
  });

  const testEvent = { name: 'Party' };
  it('Test active event toggling', () => {
    expect(store.getState().currentEvent).toEqual(null);
    // Instead of toggling to create a new event (which would make an api call, we bypass it)
    store.dispatch(actions.setActiveEvent(testEvent));
    // Confirm event was set
    expect(store.getState().currentEvent.name).toEqual(testEvent.name);

    // Disable current event and confirm it was cleared
    store.dispatch(actions.setActiveEvent(null));
    expect(store.getState().currentEvent).toEqual(null);
  });
});
