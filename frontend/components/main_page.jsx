import React from 'react';
import SessionFormContainer from './session/session_form_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import ProfileContainer from './profile/profile_container';
import GroupShowContainer from './groups/group_show/group_show_container';
import GroupFormContainer from './groups/group_form/group_form_container';
import MomentsIndexContainer from './moments/moments_index/moments_index_container';
import { AuthRoute } from '../util/route_util';

import { Switch, Route } from 'react-router-dom';



const MainPage = (props) => {

    return (
        <div className='main-page'>

            <NavBarContainer />

            <Switch>
                <Route exact path='/users/:userId' component={ProfileContainer} />
                <Route path='/groups' component={GroupShowContainer} />
                <Route exact path='/groups/new' component={GroupFormContainer} />
                <Route exact path='/' component={MomentsIndexContainer} />
            </Switch>

        </div>
    );

};

export default MainPage; 