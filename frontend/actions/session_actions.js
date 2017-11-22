
import * as ApiUtil from "../util/session_api_util";
import { receiveSessionErrors } from "./error_actions";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_USER = 'REMOVE_USER'; 
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'; 






export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER, 
    user,
});

export const logoutCurrentUser = user => ({
    type: REMOVE_USER, 
    user 
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS, 
    errors 
});

export const signup = formUser => dispatch => {
    return ApiUtil.signup(formUser)
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    .then(user => dispatch(receiveCurrentUser(user)));
};

export const login = (formUser) => dispatch => {
    return ApiUtil.login(formUser)
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    .then(user => dispatch(receiveCurrentUser(user))); 
};

export const logout = () => dispatch => {
    return ApiUtil.logout().then(user => dispatch(logoutCurrentUser()));
};