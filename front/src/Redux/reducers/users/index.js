import {
  GET_USERS,
  GET_USER_DETAIL,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  USER_ONLINE,
  CURRENT_USER,
} from "../../actions/users/action-types.js";

const initialState = {
  currentUser: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
