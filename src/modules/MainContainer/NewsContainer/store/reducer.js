import {
  SET_MAIN_NEWS,
  UPDATE_MAIN_NEWS_META,
  UPDATE_MAIN_NEWS_SEARCHPARAMS,
} from "modules/MainContainer/NewsContainer/store/constants";

const initialSearchParams = {
  query: "",
  category: "",
  language: "",
  country: "",
};

const initialMeta = {
  hasMore: true,
  offset: 0,
  limit: 20,
  loading: false,
};

const initialState = {
  list: [],
  searchParams: initialSearchParams,
  meta: initialMeta,
};

const mainNewsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MAIN_NEWS: {
      return {
        ...state,
        list: payload,
      };
    }
    case UPDATE_MAIN_NEWS_META: {
      return {
        ...state,
        meta: { ...state.meta, ...payload },
      };
    }
    case UPDATE_MAIN_NEWS_SEARCHPARAMS: {
      return {
        ...state,
        searchParams: { ...state.searchParams, ...payload },
      };
    }
    default:
      return state;
  }
};

export default mainNewsReducer;
