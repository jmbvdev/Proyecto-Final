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

export const saveCart = (orderID, cart) => {
  //orderID esta en cart.id
  return async (dispatch) => {
    if (orderID) {
      await axios.put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${orderID}`,
        { cart: cart, state: "Pending" }
      );

      return dispatch({ type: SAVE_CART });
    }
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
  //AGREGAR LA PARTE DE SI HAY USUARIO Y TOCA ESTE QUE BORRE SU CARRITO DEL BACK, TIPO ELIMINE ESE DOC
  localStorage.clear();
  return {
    type: DELETE_ALL,
  };
};

export const purchase = (orderID, cart) => {
  //ESTE VA INTEGRADO CON LA API DE MP
  return async (dispatch) => {
    await axios.put(
      `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${orderID}`,
      { cart: cart, state: "Purchase init" }
    );
    return dispatch({ type: PURCHASE });
  };
};

export const loadCart = (userID) => {
  if (userID) {
    return async (dispatch) => {
      let res = await axios.get(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/cart/${userID}`
      );
      if (res.data.data.length > 0) {
        localStorage.clear();
        dispatch({ type: LOAD_CART, payload: res.data.data });
      } else {
        let local = [];

        for (let i = 0; i < localStorage.length; i++) {
          let oneproduc = JSON.parse(localStorage.getItem(localStorage.key(i)));
          if (oneproduc.id && oneproduc.count && oneproduc.name) {
            local.push(oneproduc);
          }
        }
        await axios.post(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${userID}`,
          { cart: local }
        );
        localStorage.clear();
        return { type: LOAD_CART, payload: local };
      }
    };
  } else {
    let local = [];

    for (let i = 0; i < localStorage.length; i++) {
      let oneproduc = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (oneproduc.id && oneproduc.count && oneproduc.name) {
        local.push(oneproduc);
      }
    }

    return { type: LOAD_CART, payload: local };
  }
};
