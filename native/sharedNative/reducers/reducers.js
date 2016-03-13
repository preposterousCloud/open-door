function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

function mockData(state = [], action) {
  switch (action.type) {
    case 'SET_MOCK_DATA':
      return action.data;
    default:
      return state;
  }
}
import { combineReducers, createStore } from 'redux';

const reducer = combineReducers({ visibilityFilter, todos, mockData });
const store = createStore(reducer);

module.exports = {
  reducer,
  store,
};
