import {
  SAVE_CART,
  ADD_PRODUCT,
  DELETE_PRODUCT_SHOP,
  CHANGE_QUANTITY,
  DELETE_ALL,
  PURCHASE,
  LOAD_CART,
  CLEAR_CART,
  UPDATE_CART
} from "../../actions/shopCart/actiontypes.js";

/* 

{id: asdasdsada,
data: {......}
count: 1}

*/

const initialState = {
  products: [],
};

export default function shopCartReducer(state = initialState, action) {
  if (action.type === ADD_PRODUCT) {
    if (
      state.products.filter((p) => {
        return p.id === action.payload[0].id;
      }).length > 0
    ) {
      return state;
    }

    return {
      products: [
        ...state.products,
        { ...action.payload[0], count: action.payload[1] },
      ],
    };
  }
  if (action.type === DELETE_PRODUCT_SHOP) {
    return {
      products: state.products.filter((p) => {
        return p.id !== action.payload;
      }),
    };
  }
  if (action.type === CHANGE_QUANTITY) {
    const products = Array.from(state.products).map((p) => {
      if (p.id == action.payload[0]) {
        return { ...p, count: p.count + action.payload[1] };
      } else return p;
    });
    return {
      products: products,
    };
  }
  if (action.type === DELETE_ALL) {
    return initialState;
  }
  if (action.type === PURCHASE) {
    return initialState;
  }
  if (action.type === LOAD_CART) {
    if (action.payload.length > 0) return { products: action.payload };
    else return state;
  }
  if (action.type === SAVE_CART) {
    return state;
  }
  if (action.type === CLEAR_CART) {
    return initialState;
  }
  if (action.type === UPDATE_CART) {
    return {
      ...state,
      products: action.payload
    }
  }
  return state;
}
