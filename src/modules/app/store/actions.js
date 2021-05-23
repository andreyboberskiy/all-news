import localStorageKeys from "constants/constants";
import errorToastr from "libs/toastr/errorToastr";
import { SET_INITED, TOGGLE_LOADING } from "modules/app/store/constants";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import {
  getBreakingNewsAction,
  setBreakingNewsAction,
} from "modules/BreakingNews/store/actions";

import { setSavedNotesAction } from "modules/Notes/store/actions";
import { setSavedNewsAction } from "modules/Saved/store/actions";
import { setMainNewsAction } from "modules/MainContainer/NewsContainer/store/actions";

export const setInitedAction = () => ({
  type: SET_INITED,
});

export const initAppAction = () => async (dispatch) => {
  dispatch(toggleLoadingAction(true));

  // const breakingNews = localStorage.getItem(localStorageKeys.breakingNews);
  const savedNews = localStorage.getItem(localStorageKeys.savedNews);
  const savedNotes = localStorage.getItem(localStorageKeys.notes);

  // if (breakingNews) {
  //   dispatch(setBreakingNewsAction(Object.values(JSON.parse(breakingNews))));
  // }

  dispatch(getBreakingNewsAction());

  if (savedNews) {
    dispatch(setSavedNewsAction(JSON.parse(savedNews)));
  }
  if (savedNotes) {
    dispatch(setSavedNotesAction(JSON.parse(savedNotes)));
  }

  //  First load news
  try {
    const {
      data: { articles },
    } = await breakingNewsServices.getAllNewsByQuery({ query: "Україна" });

    dispatch(setMainNewsAction(articles));
  } catch (e) {
    errorToastr("Error", e.message);
  }

  dispatch(toggleLoadingAction(false));
  dispatch(setInitedAction());
};

export const toggleLoadingAction = (toggleValue) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADING, payload: toggleValue });
};
