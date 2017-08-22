const INCREMENT = 'project-scaffold/counter/INCREMENT';
const DECREMENT = 'project-scaffold/counter/DECREMENT';
const CLEAR = 'project-scaffold/counter/CLEAR';

const counterReducer = (state = {}, action) => {
    const {type} = action;

    switch(type) {
        case INCREMENT: 
            return state.app.counter + action.value;
        case DECREMENT:
            return state.app.counter - action.value;
        case CLEAR:
            return state.app.counter = 0;
        default:
            return state;
    }
};

const incrementCounter = (value) => {
    type: COUNTER_INCREMENT,
    value
};

const decrementCounter = (value) => {
    type: DECREMENT,
    value
};

const clearCounter = () => {
    type: CLEAR
};

export default counterReducer;

export {
    incrementCounter,
    decrementCounter,
    clearCounter
};