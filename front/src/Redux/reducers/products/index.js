import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ORDER_BY,
  FILTER_BY,
  GET_PRODUCT_DETAILS,
  CLEAR_DETAILS,
} from "../../actions/products/actiontypes.js";
import { filterby } from "../../../utils/filterby.js";

const initialState = {
  allProducts: [],
  productDetails: {},
  productsBackUp: [],
};

export default function productsReducer(state = initialState, action) {
  if (action.type === GET_ALL_PRODUCTS) {
    return {
      ...state,
      allProducts: action.payload,
      productsBackUp: action.payload,
    };
  }
  if (action.type === CREATE_PRODUCT) {
    return {
      ...state,
      allProducts: [...state.allProducts, action.payload],
      productsBackUp: [...state.allProducts, action.payload],
    };
  }
  if (action.type === EDIT_PRODUCT) {
    return {
      ...state,
      allProducts: state.allProducts.map((p) => {
        if (p.id === action.payload.id) {
          return action.payload;
        } else {
          return p;
        }
      }),
      productsBackUp: state.allProducts.map((p) => {
        if (p.id === action.payload.id) {
          return action.payload;
        } else {
          return p;
        }
      }),
    };
  }
  if (action.type === DELETE_PRODUCT) {
    return {
      ...state,
      allProducts: state.allProducts.filter((p) => p.id !== action.payload),
      productsBackUp: state.productsBackUp.filter(
        (p) => p.id !== action.payload
      ),
    };
  }
  if (action.type === ORDER_BY) {
    let products = Array.from(state.allProducts);
    products = products.sort((a, b) => {
      if (action.payload === "asc") {
        return a.data.price - b.data.price;
      } else {
        return b.data.price - a.data.price;
      }
    });

    return { ...state, allProducts: products };
  }
  if (action.type === FILTER_BY) {
    let products = Array.from(state.productsBackUp);
    products = filterby(products, action.payload[0], "type");
    products = filterby(products, action.payload[1], "size");
    products = filterby(products, action.payload[2], "categories");
    products = filterby(products, action.payload[3], "place");
    if (products.length === 0) {
      products = [{ message: "Doesn't found plant" }];
    }
    //products = filterby(products, action.payload[3], "indoor/outdoor");
    return { ...state, allProducts: products };
  }
  if (action.type === GET_PRODUCT_DETAILS) {
    return { ...state, productDetails: action.payload };
  }

  if (action.type === CLEAR_DETAILS) {
    return { ...state, productDetails: {} };
  }

  return state;
}
