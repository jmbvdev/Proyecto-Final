import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FILTER_BY,
  ORDER_BY,
  GET_PRODUCT_DETAILS,
  CLEAR_DETAILS,
} from "./actiontypes";
import axios from "axios";

//faltan los .catch para manejar errores del lado del front

export const GetAllProducts = () => {
  return async (dispatch) => {
    axios
      .get(
        "https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/all"
      )
      .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
  };
};

export const createProduct = (data) => {
  return async (dispatch) => {
    let response = await axios.post(
      "https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/create",
      data
    );
    return dispatch({ type: CREATE_PRODUCT, payload: response.data });
  };
};

export const editProduct = (id, data) => {
  return async (dispatch) => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/${id}/edit`,
        data
      )
      .then((res) => {
        dispatch({ type: EDIT_PRODUCT, payload: res.data.data });
        window.alert(
          `The product with ID: ${res.data.id} has been ${res.data.message}`
        );
      });
  };
};

export const DeleteProduct = (id) => {
  return async (dispatch) => {
    axios
      .delete(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/${id}/delete`
      )
      .then((res) => {
        window.alert(res.data.message);
        dispatch({ type: DELETE_PRODUCT, payload: id });
      });
  };
};

export const OrderBy = (order) => {
  return { type: ORDER_BY, payload: order };
};

export const FilterBy = (filt) => {
  return { type: FILTER_BY, payload: filt };
};

export const GetProductDetails = (id) => {
  return async (dispatch) => {
    axios
      .get(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/${id}`
      )
      .then((res) =>
        dispatch({ type: GET_PRODUCT_DETAILS, payload: res.data })
      );
  };
};

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
  };
}
