import {
  SAVE_CART,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_QUANTITY,
  DELETE_ALL,
  PURCHASE,
  LOAD_CART,
} from "../../actions/shopCart/actiontypes.js";
import axios from "axios";

export const saveCart = (user) => {
  return async (dispatch) => {
    if (user) {
      let res = await axios.put(
        "ruta del back que me guard el carrito de ese usuario"
      );
      console.log(res.data);
      return dispatch({ type: SAVE_CART });
    }
  };
};

export const addProduct = (product,n) => {
  return {
    type: ADD_PRODUCT,
    payload: [product,n],
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const changeQuantity = (id, n) => {
  return {
    type: CHANGE_QUANTITY,
    payload: [id, n],
  };
};

export const deleteAll = () => {
  return {
    type: DELETE_ALL,
  };
};

export const purchase = (cart) => {
  return async (dispatch) => {
    let res = await axios.post(
      "aca va la ruta del back que agrega el pedido a un usuario en particular",
      cart
    );

    return dispatch({ type: PURCHASE });
  };
};

export const loadCart = (user) => {
  return async (dispatch) => {
    if (user) {
      let res = await axios.get(
        "ruta del back que me trae lo guardado en el carrito de ese usuario"
      );
      return dispatch({ type: LOAD_CART, payload: res.data });
    }
  };
};
