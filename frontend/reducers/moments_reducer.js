import { RECEIVE_ALL_MOMENTS, RECEIVE_CURRENT_MOMENT, RECEIVE_ONE_MOMENT, REMOVE_MOMENT } from "../actions/moment_actions";
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_GROUP } from "../actions/group_actions";
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_ONE_COMMENT } from "../actions/comment_actions";
import { RECEIVE_LIKE } from '../actions/like_actions';

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
            if(action.moments){
                return action.moments;
            }else{
                return state; 
            } 
        case RECEIVE_USER: 
            return action.moments; 
        case RECEIVE_ONE_COMMENT: 
            newState = state; 
            newState[action.comment.moment_id].comments.push(action.comment);
            return merge({}, state, newState);
        case RECEIVE_LIKE: 
            newState = state; 
            newState[action.like.moment_id].likes.push(action.like); 
            return merge({}, state, newState); 
        default:
            return state;
    }
};

export default momentsReducer;  