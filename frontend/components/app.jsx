import React from 'react'; 
import SessionFormContainer from "./session/session_form_container";
import MainPage from "./main_page";
import NavBarContainer from "./nav_bar/nav_bar_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { 
    Switch, Route

 } from "react-router-dom";



const App = (props) => {
    
    return(
       
       <Switch>
            <AuthRoute exact path="/signup" component={SessionFormContainer} />
            <ProtectedRoute path="/" component={MainPage} />
       </Switch>
    
    
    );
      
};

export default App; 



