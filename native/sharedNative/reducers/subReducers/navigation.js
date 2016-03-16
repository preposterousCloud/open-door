import { combineReducers } from 'redux';

function navigator(state = {}, action) {
  switch (action.type) {
    case 'SET_APP_NAVIGATOR':
      return action.navigator;
    default:
      return state;
  }
}

function swiperRef(state = {}, action) {
  switch (action.type) {
    case 'SET_SWIPER_REF':
      return action.ref || state;
    default:
      return state;
  }
}

module.exports = combineReducers({
  navigator,
  swiperRef,
});
