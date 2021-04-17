import { SET_INITED, TOGGLE_LOADING } from "modules/app/store/constants";

const initialState = {
    appVersion: "1.0.0",
    inited: false,
    loading: false,
};

const appReducer = (state = { ...initialState }, { type, payload }) => {
    switch (type) {
        case SET_INITED: {
            return { ...state, inited: true };
        }
        case TOGGLE_LOADING: {
            return { ...state, loading: payload };
        }
        default: {
            return state;
        }
    }
};

export default appReducer;
