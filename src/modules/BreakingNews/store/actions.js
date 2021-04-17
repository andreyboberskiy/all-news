import localStorageKeys from "constants/constants";
import transformArrayToMap from "utils/transformArrayToMap";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import { SET_BREAKING_NEWS } from "modules/BreakingNews/store/constants";

export const getBreakingNewsAction = () => async (dispatch) => {
    try {
        const {
            data: { articles },
        } = await breakingNewsServices.getBreakingNews("ua");

        const transformedNewsArr = transformArrayToMap(articles);

        localStorage.setItem(
            localStorageKeys.breakingNews,
            JSON.stringify(transformedNewsArr)
        );
        dispatch(setBreakingNewsAction(articles));
    } catch (e) {
        throw new Error(e.message);
    }
};

export const setBreakingNewsAction = (news) => ({
    type: SET_BREAKING_NEWS,
    payload: news,
});
