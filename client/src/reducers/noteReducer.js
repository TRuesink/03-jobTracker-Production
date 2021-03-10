import _ from "lodash";
import {
  FETCH_NOTES,
  FETCH_NOTE,
  EDIT_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  IN_PROGRESS_NOTE,
  ERROR_NOTE,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
  error: null,
};

const noteReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_NOTE:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_NOTES:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case CREATE_NOTE:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case EDIT_NOTE:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case ERROR_NOTE:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default noteReducer;
