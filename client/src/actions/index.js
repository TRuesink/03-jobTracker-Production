import axios from "axios";
import history from "../history";

import {
  AUTH_ERROR,
  AUTH_IN_PROGRESS,
  CREATE_ACTIVITY,
  CREATE_CONTACT,
  CREATE_MEETING,
  CREATE_NOTE,
  CREATE_OPPORTUNITY,
  CREATE_SCRIPT,
  DELETE_OPPORTUNITY,
  EDIT_ACTIVITY,
  EDIT_CONTACT,
  EDIT_MEETING,
  EDIT_NOTE,
  EDIT_OPPORTUNITY,
  EDIT_SCRIPT,
  ERROR,
  ERROR_ACTIVITY,
  ERROR_CONTACT,
  ERROR_MEETING,
  ERROR_NOTE,
  ERROR_OPPORTUNITY,
  ERROR_SCRIPT,
  FETCH_ACTIVITIES,
  FETCH_CONTACT,
  FETCH_CONTACTS,
  FETCH_MEETINGS,
  FETCH_NOTES,
  FETCH_OPPORTUNITIES,
  FETCH_OPPORTUNITY,
  FETCH_SCRIPTS,
  GET_ME,
  IN_PROGRESS_ACTIVITY,
  IN_PROGRESS_CONTACT,
  IN_PROGRESS_MEETING,
  IN_PROGRESS_NOTE,
  IN_PROGRESS_OPPORTUNITY,
  IN_PROGRESS_SCRIPT,
  SIGN_OUT,
} from "./types";

// ---------------- Auth Action Creators ------------------- //

export const getMe = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_IN_PROGRESS });
      const response = await axios.get("/api/v1/auth/me");
      dispatch({ type: GET_ME, payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_IN_PROGRESS });
      const response = await axios.get("/api/v1/auth/logout");
      dispatch({ type: SIGN_OUT, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };
};

// ---------------- Opportunity Action Creators ------------------- //

export const fetchOpportunities = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.get("/api/v1/opportunities");
      dispatch({ type: FETCH_OPPORTUNITIES, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const editOpportunity = (opportunityId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.put(
        `/api/v1/opportunities/${opportunityId}`,
        formValues
      );
      dispatch({ type: EDIT_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const fetchOpportunity = (opportunityId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.get(
        `/api/v1/opportunities/${opportunityId}`
      );
      dispatch({ type: FETCH_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const createOpportunity = (formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.post(`/api/v1/opportunities`, formValues);
      dispatch({ type: CREATE_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const deleteOpportunity = (oppId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      await axios.delete(`/api/v1/opportunities/${oppId}`);
      dispatch({ type: DELETE_OPPORTUNITY, payload: oppId });
      history.push("/jobs/opportunities/deleted");
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

// ---------------- Activity Action Creators ------------------- //

export const fetchActivities = (oppId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_ACTIVITY });
      let response;
      if (oppId) {
        response = await axios.get(`/api/v1/opportunities/${oppId}/activities`);
      } else {
        response = await axios.get("/api/v1/activities");
      }
      dispatch({ type: FETCH_ACTIVITIES, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_ACTIVITY });
    }
  };
};

export const createActivity = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_ACTIVITY });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/activities`,
        formValues
      );
      dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_ACTIVITY });
    }
  };
};

export const editActivity = (activityId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_ACTIVITY });
      const response = await axios.put(
        `/api/v1/activities/${activityId}`,
        formValues
      );
      dispatch({ type: EDIT_ACTIVITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_ACTIVITY });
    }
  };
};

// ---------------- Contact Action Creators ------------------- //

export const fetchContacts = (oppId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      let response;
      if (oppId) {
        response = await axios.get(`/api/v1/opportunities/${oppId}/contacts`);
      } else {
        response = await axios.get(`/api/v1/contacts`);
      }
      dispatch({ type: FETCH_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

export const createContact = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/contacts`,
        formValues
      );
      dispatch({ type: CREATE_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

export const editContact = (contactId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.put(
        `/api/v1/contacts/${contactId}`,
        formValues
      );
      dispatch({ type: EDIT_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

export const fetchContact = (contactId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.get(`/api/v1/contacts/${contactId}`);
      dispatch({ type: FETCH_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

// ---------------- Meeting Action Creators ------------------- //

export const fetchMeetings = (oppId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_MEETING });
      let response;
      if (oppId) {
        response = await axios.get(`/api/v1/opportunities/${oppId}/meetings`);
      } else {
        response = await axios.get("/api/v1/meetings");
      }

      dispatch({ type: FETCH_MEETINGS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_MEETING });
    }
  };
};

export const createMeeting = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_MEETING });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/meetings`,
        formValues
      );
      dispatch({ type: CREATE_MEETING, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_MEETING });
    }
  };
};

export const editMeeting = (meetingId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_MEETING });
      const response = await axios.put(
        `/api/v1/meetings/${meetingId}`,
        formValues
      );
      dispatch({ type: EDIT_MEETING, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_MEETING });
    }
  };
};

// ---------------- Note Action Creators ------------------- //

export const fetchNotes = (oppId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_NOTE });
      let response;
      if (oppId) {
        response = await axios.get(`/api/v1/opportunities/${oppId}/notes`);
      } else {
        response = await axios.get("/api/v1/notes");
      }
      dispatch({ type: FETCH_NOTES, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_NOTE });
    }
  };
};

export const createNote = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_NOTE });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/notes`,
        formValues
      );
      dispatch({ type: CREATE_NOTE, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_NOTE });
    }
  };
};

export const editNote = (noteId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_NOTE });
      const response = await axios.put(`/api/v1/notes/${noteId}`, formValues);
      dispatch({ type: EDIT_NOTE, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_NOTE });
    }
  };
};

// ---------------- Script Action Creators ------------------- //

export const fetchScripts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_SCRIPT });
      const response = await axios.get("/api/v1/scripts");
      dispatch({ type: FETCH_SCRIPTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_SCRIPT });
    }
  };
};

export const createScript = (formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_SCRIPT });
      const response = await axios.post("/api/v1/scripts", formValues);
      dispatch({ type: CREATE_SCRIPT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_SCRIPT });
    }
  };
};

export const editScript = (scriptId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_SCRIPT });
      const response = await axios.put(
        `/api/v1/scripts/${scriptId}`,
        formValues
      );
      dispatch({ type: EDIT_SCRIPT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_SCRIPT });
    }
  };
};
