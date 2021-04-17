import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import {
    SET_MAIN_NEWS,
    SET_STARTED_NEWS,
} from "modules/MainContainer/NewsContainer/store/constants";
import transformArrayToMap from "utils/transformArrayToMap";

export const setMainNewsAction = (payload) => (dispatch) => {
    dispatch({ type: SET_MAIN_NEWS, payload });
};

export const setStartedNewsAction = (list) => (dispatch) => {
    const transformedList = transformArrayToMap(list);
    dispatch({ type: SET_STARTED_NEWS, payload: transformedList });
};
