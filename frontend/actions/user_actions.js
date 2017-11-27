import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'; 
export const RECEIVE_USER = 'RECEIVE_USER'; 

export const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS, 
    users
});

export const receiveUser = payload => ({
    type: RECEIVE_USER, 
    users: payload.users, 
    groups: payload.groups, 
    moments: payload.moments
});



export const requestAllUsers = () => dispatch => {
    return UserApiUtil.fetchAllUsers()
            .then(users => dispatch(receiveAllUsers(users)));
};
export const requestUser = userId => dispatch => {
    return UserApiUtil.fetchUser(userId)
            .then(user => dispatch(receiveUser(user)));
};

export const updateUser = formUser => dispatch => {
    return UserApiUtil.updateUser(formUser)
            .then(user => dispatch(receiveUser(user)));
};