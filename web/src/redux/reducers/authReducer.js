import { AUTH } from "../types";

const initialState = {
  token: "",
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
