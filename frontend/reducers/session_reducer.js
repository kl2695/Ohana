import { RECEIVE_CURRENT_USER, REMOVE_USER} from "../actions/session_actions";

const _nullSession = {
    currentUser: null
};

const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state); 
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { currentUser: action.user};
        case REMOVE_USER: 
            return _nullSession;
        default:
            return state; 
    }
};

export default sessionReducer;  