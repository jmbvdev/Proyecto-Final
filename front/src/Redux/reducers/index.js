import { combineReducers } from "redux";

import productsReducer from "./products/index.js";
import usersReducer from "./users/index.js";


const rootReducer = combineReducers({
  productsReducer,
  usersReducer,
});

export default rootReducer;
