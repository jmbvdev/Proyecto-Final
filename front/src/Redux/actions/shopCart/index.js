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
    /* aca iria la logica para pegarle a las cookies o al localStorage en caso de que el usuario no este registrado, y despacharia la misma action */
  };
};

export const addProduct = (product, n) => {
  const obj = { ...product, count: n };
  localStorage.setItem(`${product.id}`, JSON.stringify(obj));
  return {
    type: ADD_PRODUCT,
    payload: [product, n],
  };
};

export const deleteProduct = (id) => {
  localStorage.removeItem(id);
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const changeQuantity = (id, n) => {
  let produc = JSON.parse(localStorage.getItem(id));
  produc.count = produc.count + n;
  localStorage.setItem(id, JSON.stringify(produc));
  return {
    type: CHANGE_QUANTITY,
    payload: [id, n],
  };
};

export const deleteAll = () => {
  localStorage.clear();
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
  let local = [];

  for (let i = 0; i < localStorage.length; i++) {
    let oneproduc = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (oneproduc.id && oneproduc.count && oneproduc.name) {
      local.push(oneproduc);
    }
    
  }

  return { type: LOAD_CART, payload: local };

  /*  return async (dispatch) => {
    if (user) {
      let res = await axios.get(
        "ruta del back que me trae lo guardado en el carrito de ese usuario"
      );
      return dispatch({ type: LOAD_CART, payload: res.data });
    }
  }; */
};
