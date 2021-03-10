import _ from "lodash";
import {
  FETCH_SCRIPTS,
  FETCH_SCRIPT,
  EDIT_SCRIPT,
  CREATE_SCRIPT,
  DELETE_SCRIPT,
  IN_PROGRESS_SCRIPT,
  ERROR_SCRIPT,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
  error: null,
};

const scriptReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_SCRIPT:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_SCRIPTS:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case CREATE_SCRIPT:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case EDIT_SCRIPT:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case ERROR_SCRIPT:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default scriptReducer;
