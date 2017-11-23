import { combineReducers } from "redux";
import groups from './groups_reducer';
import moments from './moments_reducer';


const entitiesReducer = combineReducers({
    groups, 
    moments 
});

export default entitiesReducer; 


