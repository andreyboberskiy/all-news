import {
  SET_MAIN_NEWS,
  UPDATE_MAIN_NEWS_META,
  UPDATE_MAIN_NEWS_SEARCHPARAMS,
} from "modules/MainContainer/NewsContainer/store/constants";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import errorToastr from "libs/toastr/errorToastr";

export const setMainNewsAction = (payload) => (dispatch) => {
  dispatch({ type: SET_MAIN_NEWS, payload });
};

export const updateSearchParamsAction = (params) => ({
  type: UPDATE_MAIN_NEWS_SEARCHPARAMS,
  payload: params,
});

export const updateMetaAction = (params) => ({
  type: UPDATE_MAIN_NEWS_META,
  payload: params,
});

export const loadFirstNewsAction = () => async (dispatch, getState) => {
  const {
    mainNews: { searchParams, meta },
  } = getState();
  dispatch(updateMetaAction({ loading: true }));

  try {
    const {
      data: { articles },
    } = await breakingNewsServices.getNewsBySearchParams(searchParams);

    dispatch(setMainNewsAction(articles));

    dispatch(
      updateMetaAction({
        offset: meta.offset + articles.length,
        hasMore: meta.limit === articles.length,
      })
    );
  } catch (e) {
    errorToastr("Error", e.message);
  }
  dispatch(updateMetaAction({ loading: false }));
};
