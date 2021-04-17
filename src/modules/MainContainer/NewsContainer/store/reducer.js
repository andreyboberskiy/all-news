import {
    SET_MAIN_NEWS,
    SET_STARTED_NEWS,
} from "modules/MainContainer/NewsContainer/store/constants";

const initialState = {
    library: [],
    query: "",
    searchResult: 0,
    startedNews: [],
};

const mainNewsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MAIN_NEWS: {
            return {
                ...state,
                ...payload,
                startedNews: [],
            };
        }
        case SET_STARTED_NEWS: {
            return {
                ...state,
                startedNews: payload,
            };
        }

        default:
            return state;
    }
};

export default mainNewsReducer;
