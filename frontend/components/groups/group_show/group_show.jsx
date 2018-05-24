import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu, Item } from 'semantic-ui-react';
import { Route, Switch, Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';
import GroupShowMomentsContainer from './group_show_moments/group_show_moments_container'; 
import GroupShowMessagesContainer from './group_show_messages/group_show_messages_container';
import MessagesSideBarContainer from '../../messages/messages_sidebar_container';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            groups: this.props.groups,
            currentGroup: this.props.currentGroup,
            messagesArr: this.props.messagesArr,
        };
    }

    componentDidMount() {
        this.props.requestAllGroups();
    }

    static getDerivedStateFromProps(props, state) {
        return {
            groups: props.groups,
            messagesArr: props.messagesArr,
        };
    }

    render(){

        const { usersArr, messagesArr, messages, users, moments, createComment, currentUser } = this.props; 
        const {activeItem} = this.state; 
        let groups; 



        return(

            <div className="groupshow-container">
               
                <MessagesSideBarContainer/>

                <Switch>
                    <Route 
                        exact path='/groups/:groupId' 
                        component={GroupShowMomentsContainer}    
                    />
                    <Route 
                        path='/groups/:groupId/messages'
                        component={GroupShowMessagesContainer} 
                    />
                </Switch>
            </div>
        );
    }


}

export default GroupShow; 