import React from 'react';
import SessionFormContainer from "./session/session_form_container";
import NavBarContainer from "./nav_bar/nav_bar_container";
import ProfileContainer from "./profile/profile_container";
import GroupsContainer from "./groups/groups_container";
import AllContainer from "./all/all_container";

import { AuthRoute } from "../util/route_util";

import {
    Switch, Route

} from "react-router-dom";



const MainPage = (props) => {

    return (
        <div className="main-page">

            <NavBarContainer />

            <Switch>
                <Route exact path="/profile" component={ProfileContainer} />
                <Route exact path="/groups" component={GroupsContainer} />
                <Route exact path="/all" component={AllContainer} />
            </Switch>

        </div>
    );

};

export default MainPage; 