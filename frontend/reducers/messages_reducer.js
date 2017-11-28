import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';
import merge from 'lodash/merge';

const messagesReducer = (state = {}, action) => {
    Object.freeze(state); 
    let newState; 
    switch (action.type) {
        case RECEIVE_ALL_MESSAGES:
            return action.messages; 
        case RECEIVE_MESSAGE: 
            newState[action.message.id] = action.message; 
            return merge({}, state, newState);
        default:
            return state; 
    }
}; 

export default messagesReducer; 