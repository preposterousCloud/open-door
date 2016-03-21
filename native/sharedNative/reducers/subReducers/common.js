import { combineReducers } from 'redux';

function checklist(state = {}, action) {
  switch (action.type) {
    case 'CREATE_CHECKLIST':
      return action.userChecklist || state;
    default:
      return state;
  }
}

function checkboxChecked(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX': {
      action.checklist[action.id] = !action.checklist[action.id];
      return action.checklist || state;
    }
    default:
      return state;
  }
}

function filterText(state = '', action) {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return (typeof action.filterText === 'string') ? action.filterText : state;
    default:
      return state;
  }
}

module.exports = {
  checklist,
  checkboxChecked,
  filterText,
};
