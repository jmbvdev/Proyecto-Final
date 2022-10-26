import { combineReducers } from "redux";
import productsReducer from "./products/index.js";
import usersReducer from "./users/index.js";
import shopCartReducer from "./shopCart/index.js";

const rootReducer = combineReducers({
  productsReducer,
  usersReducer,
  shopCartReducer,
});

export default rootReducer;
