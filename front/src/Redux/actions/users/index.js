import {
    GET_USERS,
    GET_USER_DETAIL,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    USER_ONLINE
  } from "../../actions/users/action-types.js";


export const getUsers = () => {
    return async function(dispatch){
        return await fetch('http://localhost:5000/api-plants-b6153/us-central1/app/users/all')
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_USERS,
                payload: response
            })
        })
    }
};

export const getUserDetail = (id) => {
    return async function(dispatch){
        return await fetch(`http://localhost:5000/api-plants-b6153/us-central1/app/users/${id}`)
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_USER_DETAIL,
                payload: response
            })
        })
    }
};

export const createUser = (payload) => {
    return async function(dispatch){
        return await fetch('http://localhost:5000/api-plants-b6153/us-central1/app/users/register', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            dispatch({
                    type: CREATE_USER,
                    payload: response                
            })
        })
    }
    
};

export const editUser = (id, payload) => {
    return async function(dispatch){
        return await fetch(`http://localhost:5000/api-plants-b6153/us-central1/app/users/${id}`, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            dispatch({
                    type: EDIT_USER,
                    payload: response                
            })
        })
    }
};

export const deleteUser = (id) => {
    return async function(dispatch){
        return await fetch(`http://localhost:5000/api-plants-b6153/us-central1/app/users/${id}`, {
            method: "DELETE",
            mode: "cors",
        })
        .then(response => {
            dispatch({
                    type: DELETE_USER,
                    payload: response                
            })
        })
    }
};

export const userOnline = () => {
    return {
        type: USER_ONLINE
    }
}



