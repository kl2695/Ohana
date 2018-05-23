import { RECEIVE_ALL_GROUPS, RECEIVE_CURRENT_GROUP, RECEIVE_ONE_GROUP, REMOVE_GROUP } from "../actions/group_actions";
import merge from 'lodash/merge';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_ALL_MESSAGES } from '../actions/message_actions';

const groupsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}; 
    switch (action.type) {
        case RECEIVE_ALL_GROUPS: 
            return action.groups; 
        case RECEIVE_CURRENT_GROUP:
        console.log(action);
            newState["currentGroup"] = action.groups; 
            console.log(newState);
            return merge({}, state, newState); 
        case RECEIVE_ONE_GROUP:
            newState[action.groups.id] = action.groups; 
            return merge({}, state, newState); 
        case REMOVE_GROUP:
            delete newState[action.group.id]; 
            return merge({}, state, newState);
        case RECEIVE_USER: 
            if(action.groups){
                return action.groups;
            }else{
                return state; 
            }
        case RECEIVE_ALL_MESSAGES: 
            return merge({}, state, action.messages);
        default:
            return state;
    }
};

export default groupsReducer;  