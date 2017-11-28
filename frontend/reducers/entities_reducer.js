import { combineReducers } from "redux";
import users from './users_reducer';
import groups from './groups_reducer';
import moments from './moments_reducer';
import messages from './messages_reducer';


const entitiesReducer = combineReducers({
    users,
    groups, 
    moments, 
    messages,
});

export default entitiesReducer; 


