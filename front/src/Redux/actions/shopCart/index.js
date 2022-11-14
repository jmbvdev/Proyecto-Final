import {
  SAVE_CART,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_QUANTITY,
  DELETE_ALL,
  PURCHASE,
  LOAD_CART,
  CLEAR_CART,
  UPDATE_CART,
} from "../../actions/shopCart/actiontypes.js";
import axios from "axios";

export const saveCart = (cart, currentUserID) => {
  return async (dispatch) => {
    await axios.post(
      `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${currentUserID}`,
      { cart: cart }
    );
    localStorage.clear();
    return dispatch({ type: SAVE_CART });
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

export const changeQuantity = (id, n, user) => {
  if (user) {
    return {
      type: CHANGE_QUANTITY,
      payload: [id, n],
    };
  }
  let produc = JSON.parse(localStorage.getItem(id));
  produc.count = produc.count + n;
  localStorage.setItem(id, JSON.stringify(produc));
  return {
    type: CHANGE_QUANTITY,
    payload: [id, n],
  };
};

export const deleteAll = (orderid, currentuserID) => {
  localStorage.clear();
  if (currentuserID) {
    return async (dispatch) => {
      await axios.delete(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${orderid}`
      );

      dispatch({
        type: DELETE_ALL,
      });
    };
  } else
    return {
      type: DELETE_ALL,
    };
};

export const purchase = (orderID, cart, status, email) => {
  //ESTE VA INTEGRADO CON LA API DE MP
  return async (dispatch) => {
    await axios.put(
      `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${orderID}`,
      { cart: cart, state: `Order ${status}`, email: email }
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
      if (res.data.data?.length > 0) {
        localStorage.clear();
        res.data.data[0].orderID = res.data.orderid;
        dispatch({
          type: LOAD_CART,
          payload: res.data.data,
        });
      } else {
        let local = [];

        for (let i = 0; i < localStorage.length; i++) {
          let element = localStorage.key(i);
          if (!element.includes("traffic")) {
            let oneproduc = JSON.parse(localStorage.getItem(element));
            if (oneproduc.id && oneproduc.count && oneproduc.name) {
              local.push(oneproduc);
            }
          }
        }
        if (local.length > 0) {
          await axios.post(
            `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${userID}`,
            { cart: local }
          );
          localStorage.clear();
          return { type: LOAD_CART, payload: local };
        }
      }
    };
  } else {
    let local = [];

    for (let i = 0; i < localStorage.length; i++) {
      let element = localStorage.key(i);
      if (!element.includes("traffic")) {
        let oneproduc = JSON.parse(localStorage.getItem(element));
        if (oneproduc.id && oneproduc.count && oneproduc.name) {
          local.push(oneproduc);
        }
      }
    }

    return { type: LOAD_CART, payload: local };
  }
};

export const cleanCartAfterLogOut = () => {
  localStorage.clear();
  return { type: CLEAR_CART };
};

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
};
