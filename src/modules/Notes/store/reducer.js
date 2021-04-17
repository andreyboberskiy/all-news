import {
  DELETE_SAVED_NOTE,
  SAVE_NOTE,
  SET_SAVED_NOTES,
} from "modules/Notes/store/constants";

const initialState = {
  notes: {},
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SAVED_NOTES: {
      return { ...state, notes: payload };
    }
    case SAVE_NOTE: {
      return { ...state, notes: { ...payload, ...state.notes } };
    }
    case DELETE_SAVED_NOTE: {
      const copyNotes = { ...state.notes };
      delete copyNotes[payload];
      return { ...state, notes: copyNotes };
    }
    default:
      return state;
  }
};

export default notesReducer;
