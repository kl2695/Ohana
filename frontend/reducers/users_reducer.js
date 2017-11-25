import { RECEIVE_ALL_USERS, RECEIVE_USER } from "../actions/user_actions";
import merge from 'lodash/merge';

const groupsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            console.log(action.users);
            return action.users;
        case RECEIVE_USER:
            return action.user; 
        default:
            return state;
    }
};

export default groupsReducer;  