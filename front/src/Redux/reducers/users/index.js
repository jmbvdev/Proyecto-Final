import {
  GET_USERS,
  GET_USER_DETAIL,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  USER_ONLINE
} from "../../actions/users/action-types.js";

const initialState = {
  users: [],
  userDetail: {},
  online:false
  
};

export default function usersReducer(state = initialState, action) {

  switch(action.type) {
    
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload
      }
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, {...action.payload}]
      }
    case EDIT_USER:
      return {
        ...state,
        users: action.payload
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload)
      }
    case USER_ONLINE:
      return {
        ...state,
        online: !state.online
      }
    default:
      return state;
  }
}

