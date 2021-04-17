import localStorageKeys from "constants/constants";
import {
  DELETE_SAVED_NEWS,
  SAVE_NEWS,
  SET_SAVED_NEWS,
} from "modules/Saved/store/constants";

export const setSavedNewsAction = (listMap) => ({
  type: SET_SAVED_NEWS,
  payload: listMap,
});

export const deleteSavedNewsAction = (publishedAt) => (dispatch, getState) => {
  const {
    savedNews: { listMap },
  } = getState();

  const copySavedNews = { ...listMap };
  delete copySavedNews[publishedAt];

  localStorage.setItem(
    localStorageKeys.savedNews,
    JSON.stringify(copySavedNews)
  );

  dispatch({ type: DELETE_SAVED_NEWS, payload: publishedAt });
};

export const saveNewsAction = (newsData) => (dispatch, getState) => {
  const {
    savedNews: { listMap },
  } = getState();

  const newsDataWithTimestamp = { ...newsData, saveDate: new Date() };
  const newSavedNews = {
    ...listMap,
    [newsDataWithTimestamp.publishedAt]: newsDataWithTimestamp,
  };

  localStorage.setItem(
    localStorageKeys.savedNews,
    JSON.stringify(newSavedNews)
  );
  dispatch({
    type: SAVE_NEWS,
    payload: { [newsDataWithTimestamp.publishedAt]: newsDataWithTimestamp },
  });
};
