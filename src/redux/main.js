import { createReducer, createAction } from '@reduxjs/toolkit'

const defaultState = {
  test: "state goes here"
};

export const addTestData = createAction('ADD_TEST_DATA');

export default createReducer(defaultState, {
  [addTestData]: (state, action) => {
    state.test = action.payload;
  },
});
