import { ActionTypes } from "../constants/action-types";

export const setFromDestination = (dest) => {
  return {
    type: ActionTypes.SET_FROM,
    payload: dest,
  };
};

export const setToDestination = (dest) => {
  return {
    type: ActionTypes.SET_TO,
    payload: dest,
  };
};

export const setDeparturetime = (time) => {
  return {
    type: ActionTypes.SET_DEPARTURE_TIME,
    payload: time,
  };
};

export const setArrivaltime = (time) => {
  return {
    type: ActionTypes.SET_ARRIVAL_TIME,
    payload: time,
  };
};

export const updateSeatCount = (seats) => {
  return {
    type: ActionTypes.SET_SEATS_LEFT,
    payload: seats,
  };
};