import { createReducer, createAction } from '@reduxjs/toolkit'

//export const addTestData = "ADD_TEST_DATA";

const defaultState = {
  test: "state goes here"
};

//export default (state = defaultState, action) => {
  //const { type, data } = action;

  //switch (type) {
    //case addTestData:
      //return state.set("testActionData", data);
    //default:
      //return state;
  //}
//};

export const addTestData = createAction('ADD_TEST_DATA');

export default createReducer(defaultState, {
  [addTestData]: (state, action) => {
    state.test = action.payload;
  }
});

//export const testAction = () => ({
  //type: addTestData,
  //data: "test data from action"
//});
//
