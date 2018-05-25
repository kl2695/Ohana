import { combineReducers } from "redux";
import session from './session_reducer';
import errors from './errors_reducer';
import entities from './entities_reducer';
import selected from './selected_reducer';



const rootReducer = combineReducers({
    entities, 
    session,
    selected, 
    errors
});

export default rootReducer; 

