import _ from "lodash";
import {
  FETCH_CONTACTS,
  FETCH_CONTACT,
  EDIT_CONTACT,
  CREATE_CONTACT,
  DELETE_CONTACT,
  IN_PROGRESS_CONTACT,
  ERROR_CONTACT,
} from "../actions/types";

const INIT_STATE = {
  data: {},
  inProgress: false,
  error: null,
};

const contactReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IN_PROGRESS_CONTACT:
      return {
        data: { ...state.data },
        inProgress: true,
      };
    case FETCH_CONTACTS:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload.data, "_id") },
        inProgress: false,
      };
    case CREATE_CONTACT:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case EDIT_CONTACT:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case FETCH_CONTACT:
      return {
        data: { ...state.data, [action.payload.data._id]: action.payload.data },
        inProgress: false,
      };
    case ERROR_CONTACT:
      return {
        data: { ...state.data },
        inProgress: false,
        error: "There is an Error",
      };
    default:
      return state;
  }
};

export default contactReducer;
