import { createReducer } from '@reduxjs/toolkit'

export const setDisplayText = 'SET_DISPLAY_TEXT';

const defaultState = {
  value: ""
};

export default createReducer(defaultState, {
  [setDisplayText]: (state, action) => {
    state.value = action.payload;
  }
});
