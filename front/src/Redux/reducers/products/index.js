import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ORDER_BY,
  FILTER_BY,
  GET_PRODUCT_DETAILS,IS_SEARCH,
  CLEAR_DETAILS
} from "../../actions/products/actiontypes.js";
import { filterby } from "../../../utils/filterby.js";


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
    let products = Array.from(state.allProducts);
    products= products.sort((a,b)=>{
      if (action.payload==="asc") {
        return a.data.price-b.data.price
      }else{
        return b.data.price-a.data.price
      }
    })

    return { ...state, allProducts: products };
  }
  if (action.type === FILTER_BY) {
    let products = Array.from(state.allProducts);
    products = filterby(products, action.payload[0], "type");
    products = filterby(products, action.payload[1], "size");
    products = filterby(products, action.payload[2], "categorie");
    if (products.length===0) {
      products=[{message:"Doesn't found plant"}]
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
