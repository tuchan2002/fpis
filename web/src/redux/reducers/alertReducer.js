import { ALERT } from "../types";

const initialState = {
  loading: false,
  error: "",
  success: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
