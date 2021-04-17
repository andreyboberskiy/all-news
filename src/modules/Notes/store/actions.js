import localStorageKeys from "constants/constants";
import errorToastr from "libs/toastr/errorToastr";
import {
  DELETE_SAVED_NOTE,
  SAVE_NOTE,
  SET_SAVED_NOTES,
} from "modules/Notes/store/constants";

export const setSavedNotesAction = (notes) => ({
  type: SET_SAVED_NOTES,
  payload: notes,
});

export const deleteSavedNoteAction = (createdAt) => (dispatch, getState) => {
  const {
    notes: { notes },
  } = getState();

  const copyNotes = { ...notes };
  delete copyNotes[createdAt];

  localStorage.setItem(localStorageKeys.notes, JSON.stringify(copyNotes));

  dispatch({ type: DELETE_SAVED_NOTE, payload: createdAt });

  errorToastr("Видалено");
};

export const saveNoteAction = (noteData) => (dispatch, getState) => {
  const {
    notes: { notes },
  } = getState();

  const timestamp = Date.now();
  const noteWithTimeStamp = { ...noteData, createdAt: timestamp };
  const newNotes = {
    [timestamp]: noteWithTimeStamp,
    ...notes,
  };

  localStorage.setItem(localStorageKeys.notes, JSON.stringify(newNotes));
  dispatch({
    type: SAVE_NOTE,
    payload: { [timestamp]: noteWithTimeStamp },
  });
};
