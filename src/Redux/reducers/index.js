import { combineReducers } from "redux";
import { updateDestination, updateDetails, updateTime } from "./flightReducer";

const reducers = combineReducers({
  destination: updateDestination,
  time: updateTime,
  details: updateDetails,
});

export default reducers;
