import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import activityReducer from "./activityReducer";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import errorReducer from "./errorReducer";
import meetingReducer from "./meetingReducer";
import noteReducer from "./noteReducer";
import opportunityReducer from "./opportunityReducer";
import scriptReducer from "./ScriptReducer";

export default combineReducers({
  form: formReducer,
  error: errorReducer,
  auth: authReducer,
  opportunities: opportunityReducer,
  activities: activityReducer,
  contacts: contactReducer,
  meetings: meetingReducer,
  notes: noteReducer,
  scripts: scriptReducer,
});
