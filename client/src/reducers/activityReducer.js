import _ from "lodash";
import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY,
  EDIT_ACTIVITY,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  IN_PROGRESS_ACTIVITY,
  ERROR_ACTIVITY,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
  error: null,
};

const activityReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_ACTIVITY:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_ACTIVITIES:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case CREATE_ACTIVITY:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case EDIT_ACTIVITY:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case ERROR_ACTIVITY:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default activityReducer;
