import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ORDER_BY,
  FILTER_BY,
  GET_PRODUCT_DETAILS,IS_SEARCH
} from "../../actions/products/actiontypes.js";


const initialState = {
  allProducts: [],
  productDetails: {},
  isSearch:false
};

export default function productsReducer(state = initialState, action) {
  if (action.type === GET_ALL_PRODUCTS) {
    return { ...state, allProducts: action.payload };
  }
  if (action.type === CREATE_PRODUCT) {
    // return { ...state, allProducts: [...state.allProducts, action.payload] };
    return state
  }
  /* if (action.type === EDIT_PRODUCT) {
    return { ...state, allProducts: action.payload };
  } */
  if (action.type === DELETE_PRODUCT) {
    return {
      ...state,
      allProducts: state.allProducts.filter((p) => p.id !== action.payload),
    };
  }
  if (action.type === ORDER_BY) {
    return { ...state, allProducts: action.payload };
  }
  if (action.type === FILTER_BY) {
    return { ...state, allProducts: action.payload };
  }
  if (action.type === GET_PRODUCT_DETAILS) {
    return { ...state, productDetails: action.payload };
  }
  if (action.type === IS_SEARCH) {
    return { ...state, isSearch: !state.isSearch};
  }

  return state;
}