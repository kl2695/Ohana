import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from "../actions/error_actions";




const errorsReducer = (state = [], action) => {
    Object.freeze(state); 
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return {session: action.errors};
        case CLEAR_SESSION_ERRORS: 
            return {session: null}; 
        default:
            return state;
    }
};

export default errorsReducer; 