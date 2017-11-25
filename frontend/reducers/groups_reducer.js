import { RECEIVE_ALL_GROUPS, RECEIVE_CURRENT_GROUP, RECEIVE_ONE_GROUP, REMOVE_GROUP } from "../actions/group_actions";
import merge from 'lodash/merge';

const groupsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}; 
    switch (action.type) {
        case RECEIVE_ALL_GROUPS: 
            return action.groups; 
        case RECEIVE_CURRENT_GROUP:
            return action.group; 
        case RECEIVE_ONE_GROUP:
            console.log(action); 
            newState[action.group.id] = action.group; 
            return merge({}, state, newState); 
        case REMOVE_GROUP:
            delete newState[action.group.id]; 
            return merge({}, state, newState);
        default:
            return state;
    }
};

export default groupsReducer;  