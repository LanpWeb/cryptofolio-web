// combine all reducers here

import { combineReducers } from "redux";

import likeReducer from "ducks/like";
import { moduleName as likeModule } from "ducks/like/const";

export default combineReducers({
  [likeModule]: likeReducer,
});
