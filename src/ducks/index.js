import { combineReducers } from "redux-immutable";
import counterReducer from "./counter";

export default combineReducers({
  counter: counterReducer,
  dogs: () => "bark"
});
