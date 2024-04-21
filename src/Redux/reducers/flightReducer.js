import { ActionTypes } from "../constants/action-types";

const initialState = {
  from: "",
  to: "",
  arrivalTime: new Date().getTime(),
  departureTime: new Date().getTime(),
  seats: 1
};

export const updateDestination = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FROM:
      return { ...state, from: payload };
    case ActionTypes.SET_TO:
      return { ...state, to: payload };
    default:
      return state;
  }
};

export const updateTime = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DEPARTURE_TIME:
      return { ...state, departureTime: payload };
    case ActionTypes.SET_ARRIVAL_TIME:
      return { ...state, arrivalTime: payload };
    default:
      return state;
  }
};

export const updateDetails = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SEATS_LEFT:
      console.log('seats for booking', payload);
      return { ...state, seats: payload };
    default:
      return state;
  }
};