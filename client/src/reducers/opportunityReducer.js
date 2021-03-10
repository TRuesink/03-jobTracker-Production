import _ from "lodash";
import {
  FETCH_OPPORTUNITIES,
  FETCH_OPPORTUNITY,
  EDIT_OPPORTUNITY,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  IN_PROGRESS_OPPORTUNITY,
  ERROR_OPPORTUNITY,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
};

const opportunityReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_OPPORTUNITY:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_OPPORTUNITIES:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case EDIT_OPPORTUNITY:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case CREATE_OPPORTUNITY:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case FETCH_OPPORTUNITY:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case DELETE_OPPORTUNITY:
      return {
        data: _.omit(state.data, action.payload),
        inProgress: false,
      };
    case ERROR_OPPORTUNITY:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default opportunityReducer;
