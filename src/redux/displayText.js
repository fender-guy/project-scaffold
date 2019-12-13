import { createReducer, createAction } from '@reduxjs/toolkit'

const defaultState = {
  value: ""
};

export const setDisplayText = createAction('SET_DISPLAY_TEXT');

export default createReducer(defaultState, {
  [setDisplayText]: (state, action) => {
    state.value = action.payload;
  }
});
