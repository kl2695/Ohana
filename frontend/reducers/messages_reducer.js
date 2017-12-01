import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_GROUP, RECEIVE_ONE_GROUP } from '../actions/group_actions';

const messagesReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState; 
    switch (action.type) {
        case RECEIVE_ALL_MESSAGES:
            return merge({}, state, action.messages); 
        case RECEIVE_MESSAGE: 
            newState[action.message.id] = action.message; 
            return merge({}, state, newState);
        case RECEIVE_CURRENT_GROUP: 
            if(action.messages){
                return action.messages; 
            }else{
                return state; 
            }
        case RECEIVE_ONE_GROUP: 
            if(action.messages){
                return action.messages;
            }else{
                return state; 
            }
        default:
            return state; 
    }
}; 

export default messagesReducer; 