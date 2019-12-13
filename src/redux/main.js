import { createReducer } from '@reduxjs/toolkit'

export const addTestData = 'ADD_TEST_DATA';

const defaultState = {
  test: "state goes here"
};

export default createReducer(defaultState, {
  [addTestData]: (state, action) => {
    state.test = action.payload;
  },
});
