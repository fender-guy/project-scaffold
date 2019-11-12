import Immutable from "immutable";

export const addTestData = "ADD_TEST_DATA";

export default (state = Immutable.fromJS({}), action) => {
  const { type, data } = action;

  switch (type) {
    case addTestData:
      return state.set("testActionData", data);
    default:
      return state;
  }
};

export const testAction = () => ({
  type: addTestData,
  data: "test data from action"
});
