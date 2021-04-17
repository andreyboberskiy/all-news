import { SET_BREAKING_NEWS } from "modules/BreakingNews/store/constants";

const initialState = {
    library: [],
};

const breakingNewsReducer = (
    state = { ...initialState },
    { type, payload }
) => {
    switch (type) {
        case SET_BREAKING_NEWS: {
            return { ...state, library: payload };
        }
        default: {
            return state;
        }
    }
};

export default breakingNewsReducer;
