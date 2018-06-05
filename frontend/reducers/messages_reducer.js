import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_GROUP, RECEIVE_ONE_GROUP, RECEIVE_ALL_GROUPS, REMOVE_GROUP } from '../actions/group_actions';

const messagesReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState = {}; 

    switch (action.type) {
        case RECEIVE_ALL_MESSAGES:
            return merge({}, state, action.messages); 
        case RECEIVE_MESSAGE: 
            newState[action.message.id] = action.message; 
            return merge({}, state, newState);
        case RECEIVE_CURRENT_GROUP: 
            Object.assign(newState, state, {"currentMessages": action.messages});
            return newState;
        case RECEIVE_ONE_GROUP: 
            Object.assign(newState, state, { "currentMessages": action.messages });
            return newState;
        case REMOVE_GROUP: 
            return merge({}, state, newState);
        case RECEIVE_ALL_GROUPS:
            return merge({}, state, action.messages);
        default:
            return state; 
    }
}; 

export default messagesReducer; 