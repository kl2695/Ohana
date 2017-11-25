import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'; 
export const RECEIVE_USER = 'RECEIVE_USER'; 

export const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS, 
    users
});

export const receiveUser = user => ({
    type: RECEIVE_USER, 
    user 
});



export const requestAllUsers = () => dispatch => {
    return UserApiUtil.fetchAllUsers()
            .then(users => dispatch(receiveAllUsers(users)));
};
export const requestUser = formUser => dispatch => {
    return UserApiUtil.fetchUser(formUser)
            .then(user => dispatch(receiveUser(user)));
};