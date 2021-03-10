import { ERROR } from "../actions/types";

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    default:
      return null;
  }
};

export default errorReducer;
