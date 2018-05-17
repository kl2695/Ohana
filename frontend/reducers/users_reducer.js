import { RECEIVE_ALL_USERS, RECEIVE_USER } from "../actions/user_actions";
import merge from 'lodash/merge';
import { RECEIVE_ALL_MOMENTS } from "../actions/moment_actions";
import { RECEIVE_CURRENT_GROUP } from '../actions/group_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return action.users; 
        case RECEIVE_USER:
        console.log("im here now");
        console.log(action); 
            return action.users; 
        case RECEIVE_ALL_MOMENTS: 
            return action.users; 
        case RECEIVE_CURRENT_GROUP: 
            return action.users; 
        default:
            return state;
    }
};

export default usersReducer;  