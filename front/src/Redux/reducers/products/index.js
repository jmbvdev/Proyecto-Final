import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "./actiontypes";

const initialState = {
  allProducts: [],
  productDetails: {},
};

export default function productsReducer(state = initialState, action) {
  if (action.type === GET_ALL_PRODUCTS) {
    return { ...state, allProducts: action.payload };
  }
  return state;
}
