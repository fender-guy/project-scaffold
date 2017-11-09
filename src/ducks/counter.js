const INCREMENT = "project-scaffold/counter/INCREMENT";
const DECREMENT = "project-scaffold/counter/DECREMENT";
const CLEAR = "project-scaffold/counter/CLEAR";

const counterReducer = (state = Immutable.map(), action) => {
  const { type } = action;

  switch (type) {
    case INCREMENT:
      console.log("state: ", state);
      return state + action.value;
    case DECREMENT:
      return state - action.value;
    case CLEAR:
      return (state = 0);
    default:
      return state;
  }
};

const incrementCounter = value => ({
  type: INCREMENT,
  value
});

const decrementCounter = value => ({
  type: DECREMENT,
  value
});

const clearCounter = () => ({
  type: CLEAR
});

export default counterReducer;

export { incrementCounter, decrementCounter, clearCounter };
