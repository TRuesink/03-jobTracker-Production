import {
  GET_ME,
  AUTH_IN_PROGRESS,
  AUTH_ERROR,
  SIGN_OUT,
} from "../actions/types";

const authReducer = (
  state = { user: null, inProgress: false, signedIn: true },
  action
) => {
  switch (action.type) {
    case GET_ME:
      return { user: action.payload.user, inProgress: false, signedIn: true };
    case AUTH_IN_PROGRESS:
      return { user: state.user, inProgress: true, signedIn: true };
    case SIGN_OUT:
      return { user: null, inProgress: false, signedIn: false };
    case AUTH_ERROR:
      return {
        user: state.user,
        inProgress: false,
        error: action.payload,
        signedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
