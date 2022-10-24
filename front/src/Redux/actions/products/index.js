import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "./actiontypes";

export const GetAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS });
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
