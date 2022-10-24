import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "./actiontypes";
import axios from "axios";

export const GetAllProducts = () => {
  return async (dispatch) => {
    axios
      .get(
        "https://us-central1-api-plants-b6153.cloudfunctions.net/app/products/all"
      )
      .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
  };
};

export const CreateProduct = (data) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT });
  };
};

export const EditProduct = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_PRODUCT });
  };
};

export const DeleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT });
  };
};
