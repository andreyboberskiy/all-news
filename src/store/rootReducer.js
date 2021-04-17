import { connectRouter } from "connected-react-router";
import notesReducer from "modules/Notes/store/reducer";
import savedReducer from "modules/Saved/store/reducer";
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import appReducer from "modules/app/store/reducer";
import breakingNewsReducer from "modules/BreakingNews/store/reducer";
import mainNewsReducer from "modules/MainContainer/NewsContainer/store/reducer";

export default function createRootReducer(history) {
  return combineReducers({
    app: appReducer,
    breakingNews: breakingNewsReducer,
    mainNews: mainNewsReducer,
    router: connectRouter(history),
    savedNews: savedReducer,
    notes: notesReducer,
    toastr: toastrReducer,
  });
}
