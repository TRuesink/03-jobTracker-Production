import _ from "lodash";
import {
  FETCH_MEETINGS,
  FETCH_MEETING,
  EDIT_MEETING,
  CREATE_MEETING,
  DELETE_MEETING,
  IN_PROGRESS_MEETING,
  ERROR_MEETING,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
  error: null,
};

const meetingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_MEETING:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_MEETINGS:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case CREATE_MEETING:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case EDIT_MEETING:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case ERROR_MEETING:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default meetingReducer;
