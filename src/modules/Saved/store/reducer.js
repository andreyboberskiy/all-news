import {
  DELETE_SAVED_NEWS,
  SAVE_NEWS,
  SET_SAVED_NEWS,
} from "modules/Saved/store/constants";

const initialState = {
  listMap: {},
};

const savedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SAVED_NEWS: {
      return { ...state, listMap: payload };
    }
    case SAVE_NEWS: {
      return { ...state, listMap: { ...payload, ...state.listMap } };
    }
    case DELETE_SAVED_NEWS: {
      const copyListMap = { ...state.listMap };
      delete copyListMap[payload];
      return { ...state, listMap: copyListMap };
    }
    default:
      return state;
  }
};

export default savedReducer;
