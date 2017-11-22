
import * as SessionApiUtil from "../util/session_api_util";
import { receiveSessionErrors } from "./error_actions";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_USER = 'REMOVE_USER'; 






export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER, 
    user,
});

export const logoutCurrentUser = user => ({
    type: REMOVE_USER, 
    user 
});


export const signup = formUser => dispatch => {
    return SessionApiUtil.signup(formUser)
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    .then(user => dispatch(receiveCurrentUser(user)));
};

export const login = (formUser) => dispatch => {
    return SessionApiUtil.login(formUser)
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    .then(user => dispatch(receiveCurrentUser(user))); 
};

export const logout = () => dispatch => {
    return SessionApiUtil.logout().then(user => dispatch(logoutCurrentUser()));
};