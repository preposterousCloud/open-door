
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
    expect(store.getState().user.currentEvent).toBeFalsy();
    // Instead of toggling to create a new event (which would make an api call, we bypass it)
    store.dispatch(actions.setActiveEvent(testEvent));
    // Confirm event was set
    expect(store.getState().user.currentEvent.name).toEqual(testEvent.name);

    // Disable current event and confirm it was cleared
    store.dispatch(actions.setActiveEvent(null));
    expect(store.getState().user.currentEvent).toBeFalsy();
  });

  const users = [{
    id: 3,
    name: 'Rick Sanchez',
  }, {
    id: 4,
    name: 'Morty Smith',
  }];
  it('Should set the allUsers state to a populated array', () => {
    store.dispatch(actions.setAllUsers(users));
    expect(store.getState().allUsers.length).toEqual(2);
  });

  const title = 'Squad';
  it('Should live-update the title of "Create Group"', () => {
    store.dispatch(actions.liveUpdateGroupName(title));
    expect(store.getState().groupName).toEqual('Squad');
  });

  it('Should set pendingEvent when Begin creating event is dispatched', () => {
    store.dispatch(actions.updatePendingEvent({ name: 'Hacking' }));
    expect(store.getState().app.pendingEvent.name).toBeTruthy();

    store.dispatch(actions.updatePendingEvent(null));
    expect(store.getState().app.pendingEvent).toBeFalsy();
  });

  it('Should set swiper state', () => {
    expect(store.getState().app.swiperIndex).toBe(1);

    store.dispatch(actions.setSwiperIndex(0));
    expect(store.getState().app.swiperIndex).toBe(0);
  });

  it('Should keep track of toggled objects in pendingSelections', () => {
    store.dispatch(actions.toggleItemSelectionInList(3, 'testEvent'));
    expect(store.getState().app.pendingSelections.testEvent[3]).toBe(true);
    store.dispatch(actions.toggleItemSelectionInList(3, 'testEvent'));
    expect(store.getState().app.pendingSelections.testEvent[3]).toBe(false);

    store.dispatch(actions.toggleItemSelectionInList(3, 'testEvent'));
    store.dispatch(actions.toggleItemSelectionInList(5, 'testEvent'));
    expect(Object.keys(store.getState().app.pendingSelections.testEvent).length).toBe(2);
    store.dispatch(actions.clearItemSelectionInList('testEvent'));
    expect(Object.keys(store.getState().app.pendingSelections.testEvent).length).toBe(0);
  });

  const groupList = [
    {
      groupId: 1,
      members: [
        {
          id: 2,
          userName: 'Bill S. Preston',
        },
        {
          id: 6,
          userName: 'Ted Theodore Logan',
        },
      ],
    },
    {
      groupId: 2,
      members: [
        {
          id: 1,
          userName: 'Ned',
        },
        {
          id: 2,
          userName: 'Catlin',
        },
        {
          id: 3,
          userName: 'Sansa',
        },
        {
          id: 4,
          userName: 'Arya',
        },
        {
          id: 5,
          userName: 'Bran',
        },
      ],
    },
  ];

  it('Should get group members for a given group', () => {
    store.dispatch(actions.setUserGroupMembers(groupList[1]));
    expect(store.getState().userGroupMembers.members.length).toEqual(5);
  });
});
