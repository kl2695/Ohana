import { RECEIVE_ALL_MOMENTS, RECEIVE_CURRENT_MOMENT, RECEIVE_ONE_MOMENT, REMOVE_MOMENT } from "../actions/moment_actions";
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_GROUP } from "../actions/group_actions";
import { RECEIVE_USER } from '../actions/user_actions';

const momentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}; 
    switch (action.type) {
        case RECEIVE_ALL_MOMENTS: 
            return action.moments; 
        case RECEIVE_CURRENT_MOMENT:
            return action.moment; 
        case RECEIVE_ONE_MOMENT: 
            newState[action.moment.id] = action.moment; 
            return merge({}, state, newState); 
        case REMOVE_MOMENT:
            delete newState[action.moment.id]; 
            return merge({}, state, newState);
        case RECEIVE_CURRENT_GROUP: 
            return action.moments; 
        case RECEIVE_USER: 
            return action.moments; 
        default:
            return state;
    }
};

export default momentsReducer;  