import { RECEIVE_ALL_USERS, RECEIVE_USER } from "../actions/user_actions";
import merge from 'lodash/merge';
import { RECEIVE_ALL_MOMENTS } from "../actions/moment_actions";

const groupsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return action.users;
        case RECEIVE_ALL_MOMENTS: 
            return action.users; 
        case RECEIVE_USER:
            newState[action.user.id] = action.user; 
            return merge({}, state, newState); 
        default:
            return state;
    }
};

export default groupsReducer;  