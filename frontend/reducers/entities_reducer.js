import { combineReducers } from "redux";
import groups from './groups_reducer';


const entitiesReducer = combineReducers({
    groups
});

export default entitiesReducer; 


